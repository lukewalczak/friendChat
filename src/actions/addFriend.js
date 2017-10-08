import { NavigationActions } from 'react-navigation';

import callApi from '../helpers/api';

export const addFriendSuccess = friend => ({
  type: 'ADD_FRIEND_SUCCESS',
  friend,
});

export const addFriendFailure = error => ({
  type: 'ADD_FRIEND_FAILURE',
  error,
});

export const addFriend = friendEmail => dispatch => {
  callApi('/friends', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(friendEmail),
  })
    .then(response => response.json())
    .then(response => {
      if (!response.error) {
        dispatch(addFriendSuccess(response.friend));
        dispatch(NavigationActions.navigate({ routeName: 'UserAccount' }));
      } else {
        dispatch(addFriendFailure(response.message));
      }
    });
  return {
    type: 'ADD_FRIEND',
  };
};
