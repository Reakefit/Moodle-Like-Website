import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: String,
  content: String,
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'Channel'
  },
  created_at: Date
});

export const Message = mongoose.model('Message', MessageSchema)