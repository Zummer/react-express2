import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

let router = express.Router();

router.post('/', async (req, res) => {
  const {
    credentials: {
      email, password
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
      }, 'sdfsdfsdf');

      res.json({token});
    } else {
      throw new Error('Invalid Credentials');
    }
  } catch (e) {
    console.log({name: e.name, message: e.message});
    res.status(500).json(e);
  }
});

export default router;
