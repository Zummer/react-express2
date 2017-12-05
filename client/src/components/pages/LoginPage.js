import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import LoginForm from '../forms/LoginForm';

class LoginPage extends Component {
  submit = async (data) => {
    const { history, login } = this.props;
    const action = await login(data);

    if (action.status === 'SUCCESS') {
      history.push('/dashboard');
    }

    return action;
  };

  render () {
    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm
          submit={this.submit}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, {
  login
})(LoginPage);

