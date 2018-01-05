import bookshelf from '../../bookshelf.js';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import { sendConfirmationEmail } from '../mailer';

class User extends bookshelf.Model {
  constructor(data, options){
    super({
      ...data
    },
      options
    );
  }

  get hasTimestamps(){
    return true;
  }

  get email() {
    return this.get('email');
  }

  get confirmed() {
    return this.get('confirmed');
  }

  get tableName() { return 'users' };

  initialize() {
    this.on('creating', this.hashPassword, this);
    this.on('creating', this.setConfirmationToken, this);
    this.on('created', this.sendConfirmationEmail, this);
  }

  static async login(email, password) {
    if (!email || !password)  {
      throw new Error('Email and password are both required');
    }

    const hashPass = md5(password);

    const user = await new this({
      email: email.toLowerCase().trim()
    })
      .fetch({
        require: true
      });

    if (user && hashPass === user.get('password_diggest')) {
      return user.toAuthJSON();
    }

    return false;
  }

  generateJWT() {
    return jwt.sign(
      {
        email: this.email,
        confirmed: this.confirmed,
      },
      process.env.JWT_SECRET
    );
  }

  generateResetPasswordToken() {
    return jwt.sign(
      {
        id: this.id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  }


  toAuthJSON() {
    return {
      email: this.email,
      confirmed: this.confirmed,
      token: this.generateJWT()
    };
  }

  generateResetPasswordUrl(){
    return `${process.env.HOST}/reset_password/${this.generateResetPasswordToken()}`
  }

  generateConfirmationUrl(){
    return `${process.env.HOST}/confirmation/${this.get('confirmationToken')}`
  }

  sendConfirmationEmail(model, attrs, options){
    sendConfirmationEmail(this);
  }

  setConfirmationToken(model, attrs, options){
    const token = this.generateJWT();
    model.set('confirmationToken', token);
  }

  hashPassword(model, attrs, options){
    const hash = md5(model.attributes.password_diggest);
    model.set('password_diggest', hash);
  }

  setPassword(password) {
    const hash = md5(password);
    this.set('password_diggest', hash);
  }
};

export default User;

