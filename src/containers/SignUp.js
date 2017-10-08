/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { signUp } from '../actions/auth';
import {
  validateEmail,
  validatePassword,
  validateFullName,
} from '../helpers/validation';

import Input from '../components/Input';
import { PrimaryButton } from '../components/Button';
import Container from '../components/Container';
import GoBack from '../components/GoBackButton';

import type { Error, User } from '../types/types';

type Props = {
  ValidationProps: ValidationProps,
  onSignUp: ({ fullName: string, email: string, password: string }) => User,
  onClearError: () => void,
  error: Error,
};

type ValidationProps = {
  errorType: string,
  errorMessage: string,
  validateFunction: Function,
  data: string,
};

type State = {
  fullName: string,
  email: string,
  password: string,
  emailError: string,
  passwordError: string,
  fullNameError: string,
};

class SignUp extends React.Component<void, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Sign Up',
    headerLeft: (
      <GoBack
        onPress={() => {
          navigation.navigate('Main');
        }}
      />
    ),
  });

  inputEmail: Object;
  inputPassword: Object;

  state = {
    fullName: '',
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    fullNameError: '',
  };

  _validation = ({
    errorType,
    errorMessage,
    validateFunction,
    data,
  }: ValidationProps) => {
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
    const isValidPassword = this._validation({
      errorType: 'passwordError',
      errorMessage:
        'Password has to contain min 8 characters, at least one uppercase and one number',
      validateFunction: validatePassword,
      data: this.state.password,
    });
    const isValidFullName = this._validation({
      errorType: 'fullNameError',
      errorMessage: 'Invalid full name',
      validateFunction: validateFullName,
      data: this.state.fullName,
    });
    return isValidEmail && isValidPassword && isValidFullName;
  };

  _signUp = () => {
    const signUpData = {
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
    };
    if (this._validateData()) {
      this.props.onSignUp(signUpData);
    }
  };

  componentWillUnmount() {
    this.props.onClearError();
  }

  render() {
    return (
      <Container justify="center" title="sign UP">
        <Input
          name="text"
          placeholder="Full Name"
          onChangeText={fullName => this.setState({ fullName })}
          value={this.state.fullName}
          error={this.state.fullNameError}
          onSubmitEditing={() => {
            this.inputEmail.focus();
          }}
        />
        <Input
          name="email"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email.toLowerCase()}
          error={this.state.emailError || this.props.error}
          setRef={ref => {
            this.inputEmail = ref;
          }}
          onSubmitEditing={() => {
            this.inputPassword.focus();
          }}
        />
        <Input
          name="password"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          error={this.state.passwordError}
          secureTextEntry
          setRef={ref => {
            this.inputPassword = ref;
          }}
          onSubmitEditing={this._signUp}
        />
        <PrimaryButton title="register" onPress={this._signUp} />
      </Container>
    );
  }
}

export default connect(
  state => ({ error: state.error.signUpError }),
  dispatch => ({
    onSignUp: data => {
      dispatch(signUp(data));
    },
    onClearError: () => {
      dispatch({ type: 'CLEAR_ERROR' });
    },
  }),
)(SignUp);
