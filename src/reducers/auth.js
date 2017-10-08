const initState = {
  error: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS':
    case 'SIGN_IN_SUCCESS':
    case 'CLEAR_ERROR': {
      return initState;
    }
    default: {
      return state;
    }
  }
};
