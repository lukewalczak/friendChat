module.exports = {
  database: 'mongodb://YOUR_DB',
  server: {
    port: 8888,
    host: 'YOUR_HOST',
  },
  jwt: {
    secret: 'YOUR_SECRET',
    expiresIn: '1d',
  },
};
