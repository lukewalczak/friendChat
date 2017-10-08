/* @flow */
import React from 'react';
import styled from 'styled-components/native';

const ErrorText = styled.Text.attrs({
  clearButtonMode: 'always',
})`
  font-size: 10px;
  color: red;
  margin-left: 20px;
  font-style: italic;
`;

type Props = {
  props?: Object,
  error: string,
  setRef?: Object => void,
};

class Input extends React.Component<void, Props, void> {
  render() {
    const { error, setRef } = this.props;
    return (
      <Container>
        <StyledInput
          underlineColorAndroid="transparent"
          {...this.props}
          innerRef={ref => {
            if (setRef) {
              setRef(ref);
            }
          }}
        />
        {!!error && <ErrorText>{error}</ErrorText>}
      </Container>
    );
  }
}

const Container = styled.View`width: 100%;`;

const StyledInput = styled.TextInput`
  height: 40px;
  margin: 10px;
  padding: 5px;
  border-color: ${props => (props.error ? 'red' : '#606060')};
  border-width: 1px;
  border-radius: 10px;
`;

export default Input;
