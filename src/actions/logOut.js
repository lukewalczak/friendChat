import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

export const logOut = () => dispatch => {
  AsyncStorage.removeItem('jwtToken');
  dispatch(
    NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    }),
  );
  return {
    type: 'LOG_OUT',
  };
};
