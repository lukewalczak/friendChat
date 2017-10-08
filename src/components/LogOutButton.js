/* @flow */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import { connect } from 'react-redux';

import { logOut } from '../actions/logOut';

class LogOutButton extends React.Component {
  render() {
    return (
      <LogOut onPress={this.props.onLogOut}>
        <Icon name="md-log-out" size={20} />
      </LogOut>
    );
  }
}

const LogOut = styled.TouchableOpacity`padding-horizontal: 20px;`;

export default connect(
  () => ({}),
  dispatch => ({
    onLogOut: () => {
      dispatch(logOut());
    },
  }),
)(LogOutButton);
