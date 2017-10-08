/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { addFriend } from '../actions/addFriend';
import { validateEmail } from '../helpers/validation';

import Input from '../components/Input';
import Container from '../components/Container';
import { SecondaryButton } from '../components/Button';
import GoBack from '../components/GoBackButton';

import type { Error } from '../types/types';

type Props = {
  ValidationProps: ValidationProps,
  onClearError: () => void,
  onAddFriend: ({ email: string }) => void,
  error: Error,
};

type ValidationProps = {
  errorType: string,
  errorMessage: string,
  validateFunction: string => boolean,
  data: string,
};

type State = {
  email: string,
  emailError: string,
};

class AddFriend extends React.Component<void, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add friend',
    headerLeft: (
      <GoBack
        onPress={() => {
          navigation.navigate('UserAccount');
        }}
      />
    ),
  });

  state = {
    email: '',
    emailError: '',
  };

  componentWillUnmount() {
    this.props.onClearError();
  }

  _validation = ({ errorType, errorMessage, validateFunction, data }) => {
    if (validateFunction(data)) {
      this.setState({
        [errorType]: '',
      });
      return true;
    }
    this.setState({
      [errorType]: errorMessage,
    });
    return false;
  };

  _validateData = () => {
    const isValidEmail = this._validation({
      errorType: 'emailError',
      errorMessage: 'Wrong type of email',
      validateFunction: validateEmail,
      data: this.state.email,
    });
    return isValidEmail;
  };

  _addFriend = () => {
    const addFriendData = {
      email: this.state.email,
    };
    if (this._validateData()) {
      this.props.onAddFriend(addFriendData);
      this.setState({
        email: '',
      });
    }
  };

  render() {
    return (
      <Container justify="center" title="add friend to chat">
        <Input
          name="text"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email.toLowerCase()}
          error={this.state.emailError || this.props.error}
          onSubmitEditing={this._addFriend}
        />
        <SecondaryButton title="add friend" onPress={this._addFriend} />
      </Container>
    );
  }
}

export default connect(
  state => ({ error: state.error.addFriendError }),
  dispatch => ({
    onAddFriend: data => {
      dispatch(addFriend(data));
    },
    onClearError: () => {
      dispatch({ type: 'CLEAR_ERROR' });
    },
  }),
)(AddFriend);
