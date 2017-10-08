/* @flow */
import React from 'react';
import styled from 'styled-components/native';

type Props = {
  backgroundColor: string,
  title?: string,
};

const getPredefinedButton = ({ backgroundColor, title }: Props) => (
  props: Object,
): React$Element<*> => (
  <StyledButton backgroundColor={backgroundColor} title={title} {...props} />
);

const StyledButton = (props: Object): React$Element<*> => {
  return (
    <Button
      backgroundColor={props.backgroundColor}
      setWidth={props.setWidth}
      borderSize={props.borderSize}
      {...props}
    >
      <Title>{props.title}</Title>
    </Button>
  );
};

const Title = styled.Text`
  color: white;
  font-weight: bold;
`;

const Button = styled.TouchableOpacity`
  border-radius: ${props => (props.borderSize ? props.borderSize : '15px')}
  height: 50px;
  margin: 5px;
  border-style: solid;
  width: ${props => (props.setWidth ? props.setWidth : '80%')}
  border-color: ${props => props.backgroundColor};
  background-color: ${props => props.backgroundColor};
  justify-content: center;
  align-items: center;
`;

export default StyledButton;

export const PrimaryButton = getPredefinedButton({
  backgroundColor: '#E90052',
});

export const SecondaryButton = getPredefinedButton({
  backgroundColor: '#38003C',
});
