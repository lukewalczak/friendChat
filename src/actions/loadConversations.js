import callApi from '../helpers/api';

export const loadConversationsSuccess = conversations => ({
  type: 'LOAD_CONVERSATIONS_SUCCESS',
  conversations,
});

export const loadConversationsFailure = () => ({
  type: 'LOAD_CONVERSATIONS_FAILURE',
});

export const loadConversations = () => dispatch => {
  callApi('/conversations', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(conversations => {
      if (!conversations.error) {
        dispatch(loadConversationsSuccess(conversations));
      } else {
        dispatch(loadConversationsFailure(conversations.message));
      }
    })
    .catch(err => {
      console.log(err);
    });
  return {
    type: 'LOAD_CONVERSATIONS',
  };
};

export const setCurrentConversation = conversationId => ({
  type: 'SET_CURRENT_CONVERSATION',
  conversationId,
});
