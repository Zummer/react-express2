import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

class ForgotPasswordPage extends Component {
  state = {
    success: false
  };

  submit = async data => {
    const { resetPasswordRequest } = this.props;

    const action = await resetPasswordRequest(data);

    if (action.status === 'SUCCESS') {
      this.setState({
        success: true
      });
    } else if (action.status === 'FAIL') {
      this.setState({
        success: false
      });
    }

    return action;
  }

  render() {
    const { success } = this.state;

    return (
      <div>
        <h1>Forgot Password Page</h1>
        {success ? (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>Email has been sent.</Message.Header>
            </Message.Content>
          </Message>
        ) : (
          <ForgotPasswordForm submit={this.submit} />
        )}
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired,
};

export default connect(null, {
  resetPasswordRequest: actions.resetPasswordRequest
})(ForgotPasswordPage);

