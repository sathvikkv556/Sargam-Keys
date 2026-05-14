import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalytics extends Document {
  songId: mongoose.Types.ObjectId;
  timestamp: Date;
  ip?: string; // Optional: to prevent double counting if needed
  userAgent?: string;
  referrer?: string;
  source?: string;
}

const analyticsSchema = new Schema<IAnalytics>(
  {
    songId: { type: Schema.Types.ObjectId, ref: 'Song', required: true, index: true },
    timestamp: { type: Date, default: Date.now, index: true },
    ip: { type: String },
    userAgent: { type: String },
    referrer: { type: String },
    source: { type: String, default: 'direct', index: true },
  },
  { timestamps: false }
);

// Compound index for song-based time queries
analyticsSchema.index({ songId: 1, timestamp: -1 });

export default mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', analyticsSchema);
