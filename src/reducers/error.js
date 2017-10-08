const initState = {
  signUpError: '',
  signInError: '',
  addFriendError: '',
  loadFriendsError: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'SIGN_UP_FAILURE': {
      return { ...state, signUpError: action.error };
    }
    case 'SIGN_IN_FAILURE': {
      return { ...state, signInError: action.error };
    }
    case 'ADD_FRIEND_FAILURE': {
      return { ...state, addFriendError: action.error };
    }
    case 'LOAD_FRIENDS_FAILURE': {
      return { ...state, loadFriendsError: action.error };
    }
    case 'CLEAR_ERROR': {
      return initState;
    }
    default: {
      return state;
    }
  }
};
