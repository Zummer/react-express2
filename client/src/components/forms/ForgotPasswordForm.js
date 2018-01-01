import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'lodash/isEmpty';
import InlineError from '../messages/InlineError';

class ForgotPasswordForm extends Component {
  state = {
    data: {
      email: ''
    },
    loading: false,
    errors: {}
  };

  static propTypes = {
  };

  onChange = e => {
    const { data } = this.props;
    const { name, value } = e.target;

    this.setState({
      data: {
        ...data,
        [name]: value
      }
    })
  };

  onSubmit = async () => {
    const { data, submit } = this.props;
    const errors = this.validate(data);

    this.setState({ errors });

    if (isEmpty(errors)) {
      this.setState({ loading: true });
      const action = await submit(data);

      if (action.status === 'FAIL') {
        this.setState({
          errors: action.error.errors || {global: action.errorMessage},
          loading: false
        })
      }
    }
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Button primary>ForgotPasswordForm</Button>
      </Form>
    );
  }
}

export default ForgotPasswordForm;

