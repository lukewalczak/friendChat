/* @flow */
import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Main from './containers/Main';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import UserAccount from './containers/UserAccount';
import AddFriend from './containers/AddFriend';
import ConversationChat from './containers/ConversationChat';

const appNavigatorConfigAuth = {
  initialRouteName: 'Main',
};

export const AppNavigator = StackNavigator(
  {
    Main: { screen: Main },
    SignUp: { screen: SignUp },
    SignIn: { screen: SignIn },
    UserAccount: { screen: UserAccount },
    AddFriend: { screen: AddFriend },
    ConversationChat: { screen: ConversationChat },
  },
  appNavigatorConfigAuth,
);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

export default connect(state => ({
  nav: state.nav,
}))(AppWithNavigationState);
