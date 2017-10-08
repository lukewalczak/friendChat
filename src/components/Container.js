/* @flow */
import React from 'react';
import styled from 'styled-components/native';

type Props = {
  justify?: string,
  title?: string,
  children?: React$Element<*>,
};

const Container = ({ justify, title, children }: Props): React$Element<*> => (
  <Wrapper justify={justify} behavior="padding">
    <Title>{title}</Title>
    {children}
  </Wrapper>
);

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  align-items: center;
  background-color: #f5fcff;
`;

const Title = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 10px;
`;

export default Container;
