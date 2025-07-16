import mongoose, { Schema, Document } from 'mongoose';

export interface IJoinRequest extends Document {
  user: mongoose.Types.ObjectId;
  group: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const joinRequestSchema = new Schema<IJoinRequest>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Join= mongoose.model<IJoinRequest>('JoinRequest', joinRequestSchema);
export default Join;