import express from 'express';
const router = express.Router();

import { auth } from '../middleware/auth.js';
import { Channel } from '../models/Channel.js';
import { Message } from '../models/Message.js';

router.get('/', function (req, res) {
  let limit = parseInt(req.query.limit || '100', 10);
  if (limit < 1 || limit > 1000) {
    res.status(400).json({ error: true, message: 'Invalid limit.' });
    return;
  }

  Channel
    .find({})
    .select('-messages')
    .sort('-message_count')
    .limit(limit)
    .exec((err, channels) => {
      if (err) {
        res.status(500).json({ error: true, message: err.message });
        return;
      }
      res.json({ success: true, data: channels });
    });
});

router.get('/:name', function (req, res) {
  let name = req.params.name;
  if (name == null) {
    res.status(400).json({ error: true, message: 'Must specify a channel name.' });
    return;
  }

  Channel
    .findOne({ name: name })
    .select('-messages')
    .exec((err, channel) => {
      if (err) {
        res.status(500).json({ error: true, message: err.message });
        return;
      }
      else if (!channel) {
        res.status(404).json({ error: true, message: 'Channel not found.' });
        return;
      }
      res.json({ success: true, data: channel });
    });
});

router.post('/', function (req, res) {
  let name = req.body.name;
  if (name == null) {
    res.status(400).json({ error: true, message: 'Must specify a channel name.' });
    return;
  }

  Channel
    .count({ name: name })
    .exec((err, count) => {
      if (err) {
        res.status(500).json({ error: true, message: err.message });
        return;
      }
      else if (count > 0) {
        res.status(409).json({ error: true, message: 'Channel already exists.' });
        return;
      }

      var channel = new Channel({
        name: name,
        messages: [],
        message_count: 0
      });

      channel.save((err, channel) => {
        if (err) {
          res.status(500).json({ error: true, message: err.message });
          return;
        }
        res.json({ success: true, data: channel });
      });
    });
});

export default router;