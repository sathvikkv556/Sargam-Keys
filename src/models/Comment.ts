import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  songId: mongoose.Types.ObjectId;
  userName: string;
  userEmail?: string;
  content: string;
  status: 'Pending' | 'Approved' | 'Spam';
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    songId: { type: Schema.Types.ObjectId, ref: 'Song', required: true, index: true },
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, trim: true, lowercase: true },
    content: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Spam'],
      default: 'Pending',
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Index for faster queries
commentSchema.index({ songId: 1, status: 1 });
commentSchema.index({ status: 1 });

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema);
