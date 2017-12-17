import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/auth';

class ConfirmationPage extends Component {
  state = {
    loading: true,
    error: null
  };

  static propTypes = {
    confirm: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  async componentDidMount() {
    const { match, confirm } = this.props;

    const action = await confirm(match.params.token);

    if (action.status === 'SUCCESS') {
      this.setState({
        loading: false,
        error: null
      });
    } else {
      this.setState({
        loading: false,
        error: action.errorMessage
      });
    }
  }

  render() {
    const { loading, error } = this.state;

    return (
      <div>
        <h1>Confirmation Page</h1>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validateing your email</Message.Header>
          </Message>
        )}

        {!loading && !error && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>Thank you. Your account has been verified.</Message.Header>
              <Link to='/dashboard'>Go to your dashboard</Link>
            </Message.Content>
          </Message>
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
  confirm: actions.confirm
})(ConfirmationPage);

