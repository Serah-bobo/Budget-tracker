import {Response, Request} from 'express';
import Group from '../Models/GroupSchema';
import User from '../Models/UserSchema';
import {generateInviteCode} from '../utils/generateInviteCode';
import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import Join from '../Models/JoinRequest';
interface CustomRequest extends Request {
  user: { id: string };
}

// Create a new group
export const createGroup = async (req:Request,res:Response) => {
    try{
        const {name, budgetCap, description} = req.body;
        //ownerId is the ID of the user creating the group, extracted from the request object
        // Assuming req.user is populated with the authenticated user's information
        const ownerId = (req as CustomRequest).user.id;
        // Validate input
        if(!name && name.trim() === '') {
            res.status(400).json({message: 'Group name is required'});
            return;
        }
        // Check if group with same name exists for this owner
    const existingGroup = await Group.findOne({ owner: ownerId, name: name.trim() });

    if (existingGroup) {
    res.status(409).json({ message: 'A group with this name already exists.' });
    return;
    }
        
        // Generate invite code
        const inviteCode = generateInviteCode();
        // Create new group
        const newGroup=await Group.create({
            name,
            owner: ownerId,
            inviteCode,
            budgetCap: budgetCap || 0,
            description: description || '',
            members: [ownerId], // Add owner as the first member
            balance: 0, // Initialize balance to 0

        })
    
        // Add group to owner's groups
        //the owner is added to the group's members array
        //$push is used to add the new group ID to the owner's groups array
        //findByIdAndUpdate is used to update the owner's document in the database
        await User.findByIdAndUpdate(ownerId, {
            $push: { groups: newGroup._id }
        });
        // Respond with the created group
        res.status(201).json({
            message: 'Group created successfully',
            group: newGroup
        });
        }catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({message: 'Internal server error'});
    }
	
}
//get all groups for a user
export const getUserGroups: RequestHandler = async (req, res) => {
    try {
        const userId = (req as CustomRequest).user.id;
        // Find groups where the user is a member
        //find method is used to retrieve all groups from the database
        //populate method is used to populate the members field with user details
        
        const groups = await Group.find({ members: userId }).populate('members','name email')
        
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching user groups:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a group by ID
export const getGroupById: RequestHandler = async (req, res) => {
    try {
        const {groupId} = req.params;//groupId is extracted from the request parameters
        const userId = (req as CustomRequest).user.id;//userId is extracted from the request object
        // Find the group by ID and populate members
        const group = await Group.findById(groupId)
        .populate('members', 'name email')
        .populate('expenses')
        .populate('goals');
        
        if (!group) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        // Check if the user is a member of the group
        //some method is used to check if the userId exists in the group's members array
    if (!group.members.some(member => member._id?.toString() === userId)) {
        res.status(403).json({ message: 'Forbidden: You are not a member of this group' });
         return;
    }
        res.status(200).json(group);
    } catch (error) {
        console.error('Error fetching group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//join a group using invite code

export const joinGroup: RequestHandler = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = (req as CustomRequest).user.id;

    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).json({ message: 'Group not found' });
      return;
    }

    // Check if already member
    if (group.members.some(m => m.toString() === userId)) {
      res.status(400).json({ message: 'You are already a member of this group' });
    }

    // Check if already requested
    const existing = await Join.findOne({ group: groupId, user: userId, status: 'pending' });
    if (existing) {
      res.status(400).json({ message: 'You already requested to join this group' });
    }

    const joinRequest = await Join.create({
      group: groupId,
      user: userId,
      status: 'pending'
    });

    res.status(201).json({ message: 'Join request sent', joinRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Leave a group
export const leaveGroup = async (req: Request, res: Response) => {
    try{
        const { groupId } = req.params;
        const userId = (req as CustomRequest).user.id;
        // Validate input
        const group = await Group.findById(groupId);

        if (!group) {
            res.status(400).json({ message: 'Group ID is required' });
            return;
        }
        // Check if the user is a member of the group
        if (!group.members.some(member => member._id?.toString() === userId)) {
            res.status(403).json({ message: 'Forbidden: You are not a member of this group' });
            return;
        }
        // Remove user from group members
        group.members = group.members.filter(member => member._id?.toString() !== userId);
        await group.save();
        // Remove group from user's groups
        await User.findByIdAndUpdate(userId, {
            $pull: { groups: group._id } // Use $pull to remove the group from user's groups
        });
        res.status(200).json({ message: 'Successfully left the group' });

    }catch (error) {
        console.error('Error leaving group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update group details(only owner can update)
export const updateGroup = async (req: Request, res: Response) =>{
    try{
        const { groupId } = req.params;
        const userId = (req as CustomRequest).user.id;
        const { name, budgetCap, description } = req.body;
        // Validate input
        const group=await Group.findById(groupId);
        if (!group) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        // Check if the user is the owner of the group
        if (group.owner.toString() !== userId) {
            res.status(403).json({ message: 'Forbidden: You are not the owner of this group' });
            return;
        }
        // Update group details
        group.name = name || group.name;
        group.budgetCap = budgetCap || group.budgetCap;
        group.description = description || group.description;
        await group.save();
        res.status(200).json({ message: 'Group updated successfully', group });
    }catch (error) {
        console.error('Error updating group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Delete a group
export const deleteGroup = async (req: Request, res: Response) => {
    try{
        const { groupId } = req.params;
        const userId = (req as CustomRequest).user.id;
        // Validate input
        const group = await Group.findById(groupId);
        if (!group) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        // Check if the user is the owner of the group
        if (group.owner.toString() !== userId) {
            res.status(403).json({ message: 'Forbidden: Only owner can delete this group' });
            return;
        }
        // Delete the group
        await Group.findByIdAndDelete(groupId);
        // Remove group from owner's groups
        await User.updateMany(
      { groups: group._id },
      { $pull: { groups: group._id } }
    );

        res.status(200).json({ message: 'Group deleted successfully' });
    }catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}