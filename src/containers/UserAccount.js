/* @flow */
import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import { loadFriends } from '../actions/loadFriends';
import {
  loadConversations,
  setCurrentConversation,
} from '../actions/loadConversations';
import { createConversation } from '../actions/createConversation';

import Container from '../components/Container';
import FriendItemComponent from '../components/FriendItemComponent';
import { SecondaryButton } from '../components/Button';
import LogOutButton from '../components/LogOutButton';

import { mapObjectToArray } from '../helpers/mapObjectToArray';

import type { User, Friend, Conversation } from '../types/types';

type Props = {
  navigation: any,
  user: User,
  conversations: Conversation[],
  friends: { [key: string]: Friend },
  onLoadFriends: () => { [key: string]: Friend },
  onLoadConversations: () => Conversation[],
  onSetCurrentConversationId: string => string,
  onCreateConversation: string => Conversation,
};

class UserAccount extends React.Component<void, Props, void> {
  static navigationOptions = () => {
    return {
      title: 'Your account',
      headerLeft: <LogOutButton />,
    };
  };

  componentWillMount() {
    this.props.onLoadFriends();
    this.props.onLoadConversations();
  }

  findConversation = friendId => {
    const findConversation = this.props.conversations.find(
      conversation => conversation.friendId === friendId,
    );
    return findConversation;
  };

  sortAlphabetically = (a: string, b: string) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  };

  render() {
    const { fullName } = this.props.user;
    const { navigate } = this.props.navigation;
    const { friends } = this.props;

    const sortedFriends = mapObjectToArray(friends).sort((a, b) =>
      this.sortAlphabetically(a.fullName, b.fullName),
    );

    return (
      <Container>
        <Text>User : {fullName}</Text>
        <SecondaryButton
          title="add friend"
          onPress={() => {
            navigate('AddFriend');
          }}
        />
        {Object.keys(friends).length === 0 ? (
          <Text>You do not have any conversations yet.</Text>
        ) : (
          <FriendList
            data={sortedFriends}
            renderItem={({ item }) => (
              <FriendItemComponent
                fullName={item.fullName}
                goToChat={() => {
                  const conversation = this.findConversation(item._id);
                  if (conversation && conversation.id) {
                    this.props.onSetCurrentConversationId(conversation.id);
                    navigate('ConversationChat', { conversation });
                  } else {
                    this.props.onCreateConversation(item._id);
                  }
                }}
              />
            )}
            keyExtractor={item => {
              return item._id;
            }}
          />
        )}
      </Container>
    );
  }
}

const FriendList = styled.FlatList`
  flex: 1;
  width: 100%;
  padding-vertical: 20px;
  padding-horizontal: 10px;
`;

export default connect(
  state => ({
    user: state.user,
    friends: state.friends.friends,
    conversations: state.conversations.conversations,
  }),
  dispatch => ({
    onLoadFriends: () => {
      dispatch(loadFriends());
    },
    onLoadConversations: () => {
      dispatch(loadConversations());
    },
    onSetCurrentConversationId: conversationId => {
      dispatch(setCurrentConversation(conversationId));
    },
    onCreateConversation: id => {
      dispatch(createConversation(id));
    },
  }),
)(UserAccount);
