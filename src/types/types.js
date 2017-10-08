/* @flow */
export type User = {|
  fullName: string,
  email: string,
  myId: string,
|};

export type Error = string;

export type Message = {
  createdAt: Date,
  text: string,
  userId: string,
  _id: string,
};

export type Friend = {
  _id: string,
  fullName: string,
};

export type Conversation = {
  friendId: string,
  id: string,
};
