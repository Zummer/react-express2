import bookshelf from '../../bookshelf.js';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

class User extends bookshelf.Model {
  get tableName() { return 'users' };

  initialize() {
    this.on('creating', this.hashPassword, this);
  }

  get token() {
    const token = jwt.sign({
      id: this.get('id'),
      email: this.get('email')
    }, process.env.JWT_SECRET);

    return token;
  }

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
      return user.token;
    }

    return false;
  }

  hashPassword(model, attrs, options){
    const hash = md5(model.attributes.password_diggest);
    model.set('password_diggest', hash);
  }
};

export default User;

