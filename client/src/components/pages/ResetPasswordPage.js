import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import * as actions from '../../actions/auth';
import ResetPasswordForm from '../forms/ResetPasswordForm';

class ResetPasswordPage extends Component {
  state = {
    loading: true,
    error: null,
  };

  static propTypes = {
    validateToken: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  async componentDidMount() {
    const { validateToken, match } = this.props;

    const action = await validateToken(match.params.token);

    if (action.status === 'SUCCESS') {
      this.setState({
        loading: false,
        error: null,
      })
    } else if (action.status === 'FAIL') {
      this.setState({
        loading: false,
        error: action.errorMessage,
      })
    }
  }

  submit = async data => {
    const { history, resetPassword } = this.props;
    const action = await resetPassword(data);

    if (action.status === 'SUCCESS') {
      history.push('/login');
    }

    return action;
  }

  render() {
    const { loading, error } = this.state;
    const { match } = this.props;
    const token = match.params.token;

    return (
      <div>
        <h1>Reset Password Page</h1>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating token</Message.Header>
          </Message>
        )}

        {!loading && !error && (
          <ResetPasswordForm submit={this.submit} token={token}/>
        )}

        {!loading && error && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>Ooops. Invalid token it seems.</Message.Header>
              <p>{error}</p>
            </Message.Content>
          </Message>
        )}
      </div>
    );
  }
}

export default connect(null, {
  validateToken: actions.validateToken,
  resetPassword: actions.resetPassword,
})(ResetPasswordPage);

