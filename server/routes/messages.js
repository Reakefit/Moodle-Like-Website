import express from 'express';
const router = express.Router();

import Filter from 'bad-words';
import { Channel } from '../models/Channel.js';
import { Message } from '../models/Message.js';

router.get('/', function(req, res) {
  let limit = parseInt(req.query.limit || '100', 10);
  if (limit < 1 || limit > 1000) {
    res.status(400).json({ error: true, message: 'Invalid limit.' });
    return;
  }

  let channel_name = req.query.channel;
  if (channel_name == null) {
    res.status(400).json({ error: true, message: 'Must specify a channel name.' });
    return;
  }

  Channel
    .findOne({ name : channel_name })
    .select('-messages -message_count')
    .exec((err, channel) => { if (err) {
        res.status(500).json({ error: true, message: err.message });
        return;
      }
      else if (!channel) {
        res.status(404).json({ error: true, message: 'Channel not found.' });
        return;
      }

      let query = Message.find({ channel: channel._id });

      if ('after' in req.query) {
        let cutoff_date = new Date(req.query.after);
        query = Message.find({ channel: channel._id, created_at: { "$gte" : cutoff_date } });
      }

      query = query.sort('-created_at');

      query = query.limit(limit);

      query.exec((err, messages) => {
        if (err) {
          res.status(500).json({ error: true, message: err.message });
          return;
        }
        res.json({ success: true, data: messages });
      });
    });
});

router.post('/', function (req, res) {
  let channel_name = req.body.channel;
  if (channel_name == null) {
    res.status(400).json({ error: true, message: 'Must specify a channel name.' });
    return;
  }

  let message_sender = req.body.sender;
  let message_content = req.body.content;
  if (message_sender == null || message_content == null) {
    res.status(400).json({ error: true, message: 'Must specify message content and sender.' });
    return;
  }

  Channel
    .findOne({ name : channel_name })
    .exec((err, channel) => {
      if (err) {
        res.status(500).json({ error: true, message: err.message });
        return;
      }
      else if (!channel) {
        res.status(404).json({ error: true, message: 'Channel not found.' });
        return;
      }
      const filter = new Filter()
      message_content = filter.clean(message_content);
      let message = new Message({
        sender: message_sender,
        content: message_content,
        channel: channel._id,
        created_at: Date.now() 
      });

      message.save((err, message) => {
        if (err) {
          res.status(500).json({ error: true, message: err.message });
          return;
        }

        channel.messages.push(message);
        channel.message_count++;

        channel.save((err, channel) => {
          if (err) {
            res.status(500).json({ error: true, message: err.message });
            return;
          }

          res.json({ success : true, data: message }); 
        });
      });
    });
});

export default router;