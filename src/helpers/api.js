/* @flow */

import { AsyncStorage } from 'react-native';
import config from '../../api/src/config/config';

const host = config.server.host;
const port = config.server.port;
const apiURL = `http://${host}:${port}`;

export default async (url: string, options: Object) => {
  const token = await AsyncStorage.getItem('jwtToken');
  const optionsWithHeaders = token
    ? {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      }
    : options;
  return fetch(apiURL + url, optionsWithHeaders);
};
