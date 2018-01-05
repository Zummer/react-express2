import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import InvalidCredError from '../errors/InvalidCredError';
import InvalidTokenError from '../errors/InvalidTokenError';
import NotFoundError from '../errors/NotFoundError';
import TokenExpiredError from 'jsonwebtoken/lib/TokenExpiredError';
import JsonWebTokenError from 'jsonwebtoken/lib/JsonWebTokenError';
import { sendResetPasswordEmail } from '../mailer';
let router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      credentials: {
        email,
        password
      }
    } = req.body;

    const user = await User.login(email, password);

    if (user) {
      res.json({...user});
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

router.post('/confirmation', async (req, res) => {
  try {
    const token = req.body.token;
    const user = await User.query({where: {confirmationToken: token}}).fetch();

    if (user) {
      const params = {
        confirmationToken: '',
        confirmed: true
      };

      await user.save(params, {
        method: 'update',
        patch: true
      });

      res.json(user.toAuthJSON());
    } else {
      throw new InvalidTokenError('Неправильный токен');
    }
  } catch (e) {
    if (e instanceof InvalidTokenError) {
      res.status(400).json({message: e.message});
    } else {
      res.status(500).json({message: e.message});
    }
  }
});

router.post('/reset_password_request', async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.query({where: {email}}).fetch();

    if (user) {
      sendResetPasswordEmail(user);
      res.json({});
    } else {
      const e = new Error('Нет пользователя с таким email');
      e.name = 'UserNotFound';
      throw e;
    }
  } catch (e) {
    if (e.name === 'UserNotFound') {
      res.status(400).json({message: e.message});
    } else {
      res.status(500).json({message: e.message});
    }
  }
});

router.post('/set_new_password', async (req, res) => {
  try {
    const { password, token } = req.body.data;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.query({
      where: { id: decoded.id }
    });

    if (user) {
      user.setPassword(password);
      await user.save(user.changed, {
        method: 'update',
        patch: true
      });

      res.json({});
    } else {
      throw new NotFoundError('Пользователь не найден');
    }
  } catch (e) {
    const { message } = e;

    if (e instanceof TokenExpiredError) {
      res.status(401).json({message: 'Просроченный токен'});
    } else if (e instanceof NotFoundError) {
      res.status(404).json({message})
    } else if (e instanceof JsonWebTokenError) {
      res.status(400).json({message: 'Неправильный токен'})
    } else {
      res.status(500).json({message: e.message});
    }
  }
});

router.post('/validate_token', async (req, res) => {
  try {
    await jwt.verify(req.body.token, process.env.JWT_SECRET);
    res.json({});
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      res.status(401).json({message: 'Просроченный токен'});
    } else {
      res.status(500).json({message: e.message});
    }
  }
});

export default router;

