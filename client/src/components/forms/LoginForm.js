import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'lodash/isEmpty';
import InlineError from '../messages/InlineError';

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    const { data } = this.props;
    const {
      name,
      value
    } = e.target;

    this.setState({
      data: {
        ...data,
        [name]: value
      }
    });
  };

  onSubmit = async () => {
    const {data} = this.state;
    const {submit} = this.props;
    const errors = this.validate(data);
    this.setState({errors});

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

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = "Can't be blank";

    return errors;
  };

  render() {
    const {data, errors, loading} = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>{errors.global}</p>
        </Message>}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email}/>}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it secure"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password}/>}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;

