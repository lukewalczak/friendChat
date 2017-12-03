module.exports = {
  database: 'mongodb://localhost:27017/testingChat/db',
  server: {
    port: 8888,
    host: '192.168.1.119',
  },
  jwt: {
    secret: 'NeverDoIt',
    expiresIn: '1d',
  },
};
