import hapiAuthJwt2 from 'hapi-auth-jwt2';
import * as handlers from './handlers';
import User from './db/models/user';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const config = require('./config/config');
const Joi = require('joi');

const server = new Hapi.Server();

const sockets = {};

server.connection(config.server);

const socketio = require('socket.io')(server.listener, {
  pingTimeout: 5000,
});

socketio.on('connection', (socket) => {
  socket.on('init', (userId) => {
    sockets[userId.senderId] = socket;
  });
  socket.on('message', (message) => {
    if (sockets[message.receiverId]) {
      sockets[message.receiverId].emit('message', message);
    }
    handlers.createMessage(message);
  });
  socket.on('disconnect', (userId) => {
    delete sockets[userId.senderId];
  });
});

mongoose.connect(config.database);

const validate = (decoded, request, callback) => {
  User.findOne({ email: decoded.email }).then(
    (user) => {
      if (!user) {
        return callback(null, false);
      }
      return callback(null, true);
    },
  );
};


server.register(hapiAuthJwt2, (err) => {
  if (err) {
    console.log(err);
  }

  server.auth.strategy('jwt', 'jwt', {
    key: config.jwt.secret,
    validateFunc: validate,
    verifyOptions: {
      algorithms: ['HS256'],
    },
  });

  server.route({
    method: 'POST',
    path: '/register',
    handler: handlers.createUser,
    config: {
      auth: false,
      validate: {
        payload: {
          fullName: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
        },
      },
    },
  });

  server.route({
    method: 'POST',
    path: '/login',
    handler: handlers.logIn,
    config: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string().required(),
          password: Joi.string().required(),
        },
      },
    },
  });

  server.route({
    method: 'POST',
    path: '/friends',
    handler: handlers.addFriend,
    config: {
      auth: 'jwt',
      validate: {
        payload: {
          email: Joi.string().required(),
        },
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/friends',
    handler: handlers.loadFriends,
    config: {
      auth: 'jwt',
    },
  });

  server.route({
    method: 'GET',
    path: '/conversations',
    handler: handlers.loadConversations,
    config: {
      auth: 'jwt',
    },
  });

  server.route({
    method: 'POST',
    path: '/conversations',
    handler: handlers.createConversation,
    config: {
      auth: 'jwt',
      validate: {
        payload: {
          friendId: Joi.string().required(),
        },
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/messages/{conversationId}',
    handler: handlers.loadMessages,
    config: {
      auth: 'jwt',
    },
  });

  server.auth.default('jwt');
});

server.start((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
