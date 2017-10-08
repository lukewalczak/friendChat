/* @flow */
import React from 'react';

import { PrimaryButton, SecondaryButton } from '../components/Button';
import Container from '../components/Container';

type Props = {
  navigation: any,
};

export default class Main extends React.Component<void, Props, void> {
  static navigationOptions = {
    header: false,
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container justify="center" title="friendChat">
        <PrimaryButton
          title="Sign up"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
        <SecondaryButton
          title="Sign in"
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        />
      </Container>
    );
  }
}
