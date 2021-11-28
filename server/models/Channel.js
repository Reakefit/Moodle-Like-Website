import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  name: String,
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  message_count: Number
});

export const Channel = mongoose.model('Channel', ChannelSchema)
