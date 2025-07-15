import {Response, Request} from 'express';
import Group from '../Models/GroupSchema';
import User from '../Models/UserSchema';
import {generateInviteCode} from '../utils/generateInviteCode';
import { RequestHandler } from 'express';

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
export const joinGroup = async (req: Request, res: Response) => {
    try{
        const {inviteCode} = req.body;
        const userId = (req as CustomRequest).user.id;
        // Validate input
        if (!inviteCode || inviteCode.trim() === '') {
            res.status(400).json({ message: 'Invite code is required' });
            return;
        }
        // Find the group by invite code
        const group = await Group.findOne({ inviteCode: inviteCode});
        if (!group) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        // Check if the user is already a member
    if (group.members.some(member => member._id?.toString() === userId)) {
            res.status(400).json({ message: 'You are already a member of this group' });
            return;
        }
        // Add user to group members
        group.members = group.members.filter(m => m.toString() !== userId);
        await group.save();
        // Add group to user's groups
        await User.findByIdAndUpdate(userId, {
            $addToSet: { groups: group._id } // Use $addToSet to avoid duplicates
        });
        res.status(200).json({ message: 'Successfully joined the group', group });
    }catch (error) {
        console.error('Error joining group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}