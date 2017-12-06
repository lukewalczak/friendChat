import bcrypt from 'bcrypt';
import Boom from 'boom';
import JWT from 'jsonwebtoken';

import User from '../db/models/user';
import config from '../config';
import sanitizeUser from '../helpers/sanitizeUser';

const secret = config.jwt.secret;
const expiresIn = config.jwt.expiresIn;

const getHashedPassword = (password) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};

export default async function (request, reply) {
  let newUser;
  await User.findOne({ email: request.payload.email }).then(
    (user) => {
      if (!user) {
        const hashedPassword = getHashedPassword(request.payload.password);
        newUser = new User({
          fullName: request.payload.fullName,
          email: request.payload.email,
          password: hashedPassword,
        });
        newUser.save((err) => { console.log(err); });
        const token = JWT.sign({ email: newUser.email }, secret, { expiresIn });
        reply({ token, user: sanitizeUser(newUser) });
      }
      reply(Boom.conflict('User already exists'));
    });
}
