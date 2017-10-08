const initState = null;

export default (state = initState, action) => {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS': {
      return { ...state, ...action.userData };
    }
    case 'SIGN_UP_FAILURE': {
      return initState;
    }
    case 'SIGN_IN_SUCCESS': {
      return { ...state, ...action.userData };
    }
    case 'SIGN_IN_FAILURE': {
      return initState;
    }
    case 'LOG_OUT': {
      return initState;
    }
    default: {
      return state;
    }
  }
};
