import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
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
    const user = await User.query({
      where: {email},
    }).fetch();

    if (user && md5(password) === user.get('password_diggest')) {
      const token = jwt.sign({
        id: user.get('id'),
        email: user.get('email')
      }, process.env.JWT_SECRET);

      res.json({token});
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
