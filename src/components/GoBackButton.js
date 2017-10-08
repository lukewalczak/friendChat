/* @flow */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

type Props = {
  onPress: Function,
};

const GoBackButton = ({ onPress }: Props) => {
  return (
    <GoBack onPress={onPress}>
      <Icon name="ios-arrow-dropleft-circle" size={20} />
    </GoBack>
  );
};

const GoBack = styled.TouchableOpacity`padding-horizontal: 20px;`;

export default GoBackButton;
