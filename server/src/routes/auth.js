import express from 'express';
import User from '../models/User';
import InvalidCredError from '../errors/InvalidCredError';

let router = express.Router();

router.post('/', async (req, res) => {
  const {
    credentials: {
      email,
      password
    }
  } = req.body;

  try {
    const token = await User.login(email, password);

    if (token) {
      res.json({ token });
    } else {
      throw new InvalidCredError('Invalid Credentials');
    }
  } catch (e) {
    if (e instanceof InvalidCredError) {
      res.status(401).json({message: e.message});
    } else {
      res.status(500).json({message: e.message});
    }
  }
});

export default router;
