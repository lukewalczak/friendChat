/* @flow */
import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  fullName: string,
  goToChat: Function,
};

type State = {
  isExpanded: boolean,
};

class FriendItemComponent extends React.Component<void, Props, State> {
  state = {
    isExpanded: false,
  };

  componentWillUpdate(_: Props, nextState: State) {
    if (nextState.isExpanded !== this.state.isExpanded)
      LayoutAnimation.easeInEaseOut();
  }

  _toggle = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  render() {
    const { isExpanded } = this.state;
    const { fullName, goToChat }: Props = this.props;
    return (
      <FriendItem onPress={this._toggle}>
        <Dropdown>
          <FriendName>{fullName}</FriendName>
          <Icon name="ios-arrow-dropdown" size={20} />
        </Dropdown>
        {isExpanded && (
          <ExpandedView>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this._toggle();
                  goToChat();
                }}
              >
                <Text>message to {fullName}</Text>
              </TouchableOpacity>
            </View>
          </ExpandedView>
        )}
      </FriendItem>
    );
  }
}

const FriendItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.1,
})`
  border-color: #606060;
  border-width: 1px;
  border-radius: 5px;
  margin-vertical: 10px;
`;

const FriendName = styled.Text`
  padding-vertical: 10px;
  width: 100%;
`;

const ExpandedView = styled.View`
  padding-horizontal: 20px;
  padding-vertical: 16px;
`;

const Dropdown = styled.View`
  padding-horizontal: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default FriendItemComponent;
