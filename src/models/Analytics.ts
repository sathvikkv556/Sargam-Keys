import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalytics extends Document {
  songId?: mongoose.Types.ObjectId;
  theorySlug?: string;
  timestamp: Date;
  sessionId: string; // To group views into sessions
  duration?: number; // Time spent in seconds
  isExit?: boolean; // If this was the last page in session
  ip?: string;
  userAgent?: string;
  referrer?: string;
  source?: string;
}

const analyticsSchema = new Schema<IAnalytics>(
  {
    songId: { type: Schema.Types.ObjectId, ref: 'Song', required: false, index: true },
    theorySlug: { type: String, required: false, index: true },
    timestamp: { type: Date, default: Date.now, index: true },
    sessionId: { type: String, index: true },
    duration: { type: Number, default: 0 },
    isExit: { type: Boolean, default: false },
    ip: { type: String },
    userAgent: { type: String },
    referrer: { type: String },
    source: { type: String, default: 'direct', index: true },
  },
  { timestamps: false }
);

// Compound index for session and song based queries
analyticsSchema.index({ sessionId: 1, timestamp: 1 });
analyticsSchema.index({ songId: 1, timestamp: -1 });
analyticsSchema.index({ theorySlug: 1, timestamp: -1 });

export default mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', analyticsSchema);
