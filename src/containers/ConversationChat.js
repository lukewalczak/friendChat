/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

import { loadMessages, sendMessage } from '../actions/loadMessages';

import config from '../../api/src/config';

import GoBack from '../components/GoBackButton';
import type { User, Message, Friend } from '../types/types';

type Props = {
  onSendMessage: (string, Message) => Message,
  onLoadMessages: string => Message[],
  navigation: any,
  messages?: Message[],
  user: User,
  friends: { [key: string]: Friend },
};

type State = {
  message: string,
};

class ConversationChat extends React.Component<void, Props, State> {
  socket: Object;

  static navigationOptions = ({ navigation }) => ({
    title: 'Chat',
    headerLeft: (
      <GoBack
        onPress={() => {
          navigation.navigate('UserAccount');
        }}
      />
    ),
  });

  constructor(props) {
    super(props);
    const host = config.server.host;
    const port = config.server.port;
    this.socket = SocketIOClient(`http://${host}:${port}`);
    this.socket.emit('init', {
      senderId: this.props.user.myId,
    });
    this.socket.on('message', message => {
      const newMessage = {
        createdAt: message.createdAt,
        text: message.text,
        userId: message.senderId,
        _id: message.msgId,
      };
      this.props.onSendMessage(message.conversationId, newMessage);
    });
  }

  state = {
    message: '',
  };

  componentWillMount() {
    this.props.onLoadMessages(
      this.props.navigation.state.params.conversation.id,
    );
  }

  componentWillUnmount() {
    this.socket.emit('disconnect', {
      senderId: this.props.user.myId,
    });
  }

  getConversationFriend = id => {
    const { user, friends } = this.props;
    return id === user.myId ? user.fullName : friends[id].fullName;
  };

  getMappedMessages = () => {
    return this.props.messages
      ? this.props.messages
          .map(({ _id, text, createdAt, userId }) => {
            return {
              _id,
              text,
              createdAt,
              user: {
                _id: userId,
                name: this.getConversationFriend(userId),
              },
            };
          })
          .reverse()
      : [];
  };

  _onSend = message => {
    const { conversation } = this.props.navigation.state.params;
    const { user, onSendMessage } = this.props;
    this.socket.emit('message', {
      conversationId: conversation.id,
      text: message[0].text,
      senderId: user.myId,
      receiverId: conversation.friendId,
      createdAt: new Date(),
      msgId: message[0]._id,
    });
    const newMessage = {
      createdAt: message[0].createdAt,
      text: message[0].text,
      userId: message[0].user._id,
      _id: message[0]._id,
    };
    onSendMessage(conversation.id, newMessage);
  };

  render() {
    return (
      <GiftedChat
        messages={this.getMappedMessages()}
        onSend={this._onSend}
        user={{ _id: this.props.user.myId }}
      />
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    messages: state.messages[state.conversations.currentConversationId],
    friends: state.friends.friends,
  }),
  dispatch => ({
    onLoadMessages: conversationId => {
      dispatch(loadMessages(conversationId));
    },
    onSendMessage: (conversationId, message) => {
      dispatch(sendMessage(conversationId, message));
    },
  }),
)(ConversationChat);
