import callApi from '../helpers/api';

export const loadMessagesSuccess = ({ messages, id }) => ({
  type: 'LOAD_MESSAGES_SUCCESS',
  id,
  messages,
});

export const loadMessagesFailure = () => ({
  type: 'LOAD_MESSAGES_FAILURE',
});

export const loadMessages = conversationId => dispatch => {
  callApi(`/messages/${conversationId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(messages => {
      if (!messages.error) {
        dispatch(loadMessagesSuccess(messages));
      } else {
        dispatch(loadMessagesFailure(messages.message));
      }
    })
    .catch(err => {
      console.log(err);
    });
  return {
    type: 'LOAD_MESSAGES',
  };
};

export const sendMessage = (conversationId, message) => ({
  type: 'SEND_MESSAGE',
  conversationId,
  message,
});
