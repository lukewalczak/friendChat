/* @flow */
export const mapObjectToArray = (object: Object): Array<*> =>
  Object.keys(object).map(key => object[key]);
