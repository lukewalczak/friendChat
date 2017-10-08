const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case 'LOAD_MESSAGES_SUCCESS': {
      return {
        ...state,
        [action.id]: action.messages,
      };
    }
    case 'LOAD_MESSAGES_FAILURE': {
      return initState;
    }
    case 'SEND_MESSAGE': {
      if (state[action.conversationId]) {
        return {
          ...state,
          [action.conversationId]: [
            ...state[action.conversationId],
            action.message,
          ],
        };
      }
      return {
        ...state,
        [action.conversationId]: [action.message],
      };
    }
    default: {
      return state;
    }
  }
};
