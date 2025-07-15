import {Schema,Document} from 'mongoose';
import mongoose, { Types } from 'mongoose';

export interface IGroup extends Document {
    _id: Types.ObjectId;// Unique identifier for the group
    name: string;
    owner: Types.ObjectId;// Reference to the user who owns the group
    members: Types.ObjectId[];// Array of user IDs who are members of the group
    inviteCode: string;//  invite code for joining the group
    budgetCap?: number;// maximum budget for the group
    expenses: Types.ObjectId[];// Array of expense IDs associated with the group
    goals: Types.ObjectId[];// Array of goal IDs associated with the group
    balance: number;// Current balance of the group
    description?: string;// Optional description of the group
}
const groupSchema = new Schema(
    {
        name:{
            type: String,
            required: [true, 'Please provide a group name'],
            trim: true,
            minlength: [2, 'Group name must be at least 2 characters long'],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        inviteCode: {
            type: String,
            required: true,
            unique: true,
        },
        budgetCap: {
            type: Number,
            default: 0,
        },
        expenses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Expense',
            }
        ],
        goals:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Goal',
            }
        ],
        balance: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
)

const Group = mongoose.model<IGroup>('Group', groupSchema);
export default Group;
