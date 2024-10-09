import mongoose from 'mongoose';

interface SessionDocument extends mongoose.Document {
  sessionId: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
  sessionId: String,
  email: String,
  name: String,
  iat: Number,
  exp: Number,
});

export default sessionSchema;
export const SessionModel = mongoose.model('Session', sessionSchema);
