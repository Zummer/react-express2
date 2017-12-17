import express from 'express';
import User from '../models/User';
import InvalidCredError from '../errors/InvalidCredError';
import InvalidTokenError from '../errors/InvalidTokenError';

let router = express.Router();

router.post('/', async (req, res) => {
  const {
    credentials: {
      email,
      password
    }
  } = req.body;

  try {
    const userJson = await User.login(email, password);

    if (userJson) {
      res.json({...userJson});
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
  const token = req.body.token;
  try {
    const user = await User.query({
      where: {confirmationToken: token},
    })
      .fetch();
    if (user) {
      const params = {
        confirmationToken: '',
        confirmed: true
      };

      await user.save(params, {
        method: 'update',
        patch: true
      });

      res.json(user.toAuthJSON())
    } else {
      throw new InvalidTokenError('Неправильный токен');
    }
  } catch (e) {
    console.log(e);
    if (e instanceof InvalidTokenError) {
      res.status(400).json({message: e.message});
    } else {
      res.status(500).json({message: e.message});
    }
  }

})

export default router;
