const initState = {
  currentConversationId: '',
  conversations: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'LOAD_CONVERSATIONS_SUCCESS': {
      return { ...state, conversations: action.conversations };
    }
    case 'LOAD_CONVERSATIONS_FAILURE': {
      return initState;
    }
    case 'CREATE_CONVERSATION_SUCCESS': {
      return {
        conversations: [...state.conversations, action.conversation],
        currentConversationId: action.conversation.id,
      };
    }
    case 'CREATE_CONVERSATION_FAILURE': {
      return initState;
    }
    case 'SET_CURRENT_CONVERSATION': {
      return { ...state, currentConversationId: action.conversationId };
    }
    default: {
      return state;
    }
  }
};
