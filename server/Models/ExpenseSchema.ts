import {Schema, Document} from 'mongoose';
import mongoose, { Types } from 'mongoose';

export interface IExpense extends Document {
  userId: string;   // reference to logged-in user
  amount: number;
  category: string;
  date: Date;
  notes?: string;
 
}

const expenseSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: [0, 'Amount must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);
export default Expense;