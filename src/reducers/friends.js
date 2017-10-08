const initState = {
  friends: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_FRIEND_SUCCESS': {
      return {
        friends: { ...state.friends, [action.friend._id]: action.friend },
      };
    }
    case 'LOAD_FRIENDS_SUCCESS': {
      return { friends: action.friends };
    }
    default: {
      return state;
    }
  }
};
