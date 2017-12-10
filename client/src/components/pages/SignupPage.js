import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from '../forms/SignupForm';
import * as actions from '../../actions/users';

class SignupPage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    signup: PropTypes.func.isRequired,
  };

  submit = data => {
    const { history, signup } = this.props;
    const action = signup(data);

    if (action.status === 'SUCCESS') {
      history.push('/dashboard');
    }

    return action;
  }

  render() {
    return (
      <div>
        <h1>Signup page</h1>
        <SignupForm submit={this.submit}/>
      </div>
    );
  }
}

export default connect(null, {
  signup: actions.signup
})(SignupPage);

