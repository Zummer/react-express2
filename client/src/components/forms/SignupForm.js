import React, { Component} from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'lodash/isEmpty';
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class SignupForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  static propTypes = {
    submit: PropTypes.func.isRequired,
  };

  validate = data => {
    const errors ={};

    if (!isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = "Can't be blank";

    return errors;
  };

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  onSubmit = async () => {
    const { data } = this.state;
    const { submit } = this.props;
    const errors = this.validate(data);
    this.setState({ errors });

    if (isEmpty(errors)) {
      this.setState({loading: true});

      const action = await submit(data);

      if (action.status === 'FAIL') {
        this.setState({
          errors: action.error.errors || {global: action.errorMessage},
          loading: false
        })
      }
    }
  }

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>{errors.global}</p>
        </Message>}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeHolder="examlple@example.com"
            value={data.email}
            onChange={this.onChange}
          />
        </Form.Field>
        {!!errors && <InlineError text={errors.email}/>}
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
        </Form.Field>
        {!!errors && <InlineError text={errors.password}/>}
        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

export default SignupForm;

