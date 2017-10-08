import callApi from '../helpers/api';

export const loadFriendsSuccess = friends => ({
  type: 'LOAD_FRIENDS_SUCCESS',
  friends,
});

export const loadFriendsFailure = error => ({
  type: 'LOAD_FRIENDS_FAILURE',
  error,
});

export const loadFriends = () => dispatch => {
  callApi('/friends', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(friends => {
      if (!friends.error) {
        dispatch(loadFriendsSuccess(friends));
      } else {
        dispatch(loadFriendsFailure(friends.message));
      }
    });
  return {
    type: 'LOAD_FRIENDS',
  };
};
