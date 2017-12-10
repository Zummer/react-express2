import express from 'express';
import User from '../models/User';
import InvalidCredError from '../errors/InvalidCredError';

const router = express.Router();

router.post('/', async (req, res) => {
  const {
    data: {
      email,
      password
    }
  } = req.body;

  try {
    const user = new User({
      email,
      password_diggest: password
    });

    await user.save();

    res.json({
      token: user.token
    });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      res.status(401).json({message: 'This email exists already'});
    } else {
      res.status(500).json({message: e.message});
    }
  }
})

export default router;

