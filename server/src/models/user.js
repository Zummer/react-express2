import bookshelf from '../../bookshelf.js';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

class User extends bookshelf.Model {
  get tableName() { return 'users' };

  static async login(email, password) {
    if (!email || !password)  {
      throw new Error('Email and password are both required');
    }

    const user = await new this({
      email: email.toLowerCase().trim()
    })
      .fetch({
        require: true
      });

    if (user && md5(password) === user.get('password_diggest')) {
      const token = jwt.sign({
        id: user.get('id'),
        email: user.get('email')
      }, process.env.JWT_SECRET);

      return token;
    }

    return false;
  }
};

export default User;

