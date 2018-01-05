import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Message, Form, Button } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import InlineError from '../messages/InlineError';

class ResetPasswordForm extends Component {
  state = {
    data: {
      token: this.props.token,
      password: '',
      passwordConfirmation: '',
    },
    loading: false,
    errors: {}
  };

  static propTypes = {
    submit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  };

  onChange = e => {
    const { name, value } = e.target;
    const { data } = this.state;

    this.setState({
      data: {
        ...data,
        [name]: value
      }
    })
  };

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
        });
      }
    }
  };

  validate = data => {
    const errors = {};

    if (!data.password) {
      errors.password = "Can't be blank";
    }

    if (data.password !== data.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords must match';
    }

    return errors;
  };

  render() {
    const { loading, errors, data } = this.state;

    return (
      <div>
        <Form onSubmit={this.onSubmit} loading={loading}>
          {errors.global && <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>}
          <Form.Field error={!!errors.password}>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="you new password"
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <Form.Field error={!!errors.passwordConfirmation}>
            <label htmlFor="passwordConfirmation">Confirm you new password</label>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="type it again, please"
              value={data.passwordConfirmation}
              onChange={this.onChange}
            />
            {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
          </Form.Field>

          <Button primary>Reset Password</Button>
        </Form>
      </div>
    );
  }
}

export default ResetPasswordForm;
