import { NavigationActions } from 'react-navigation';

import callApi from '../helpers/api';

export const createConversationSuccess = conversation => ({
  type: 'CREATE_CONVERSATION_SUCCESS',
  conversation,
});

export const createConversationFailure = error => ({
  type: 'CREATE_CONVERSATION_FAILURE',
  error,
});

export const createConversation = friendId => dispatch => {
  callApi('/conversations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ friendId }),
  })
    .then(response => response.json())
    .then(conversation => {
      if (!conversation.error) {
        dispatch(createConversationSuccess(conversation));
        dispatch(
          NavigationActions.navigate({
            routeName: 'ConversationChat',
            params: { conversation },
          }),
        );
      } else {
        dispatch(createConversationFailure(conversation.message));
      }
    });
  return {
    type: 'CREATE_CONVERSATION',
  };
};
