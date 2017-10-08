import JWT from 'jsonwebtoken';
import Boom from 'boom';
import bcrypt from 'bcrypt';
import User from '../db/models/user';
import config from '../config/config';
import sanitizeUser from '../helpers/sanitizeUser';

const secret = config.jwt.secret;
const expiresIn = config.jwt.expiresIn;

export default function logIn({
  headers,
  payload: { email, password },
}, reply) {
  User.findOne({ email }).then(
    (user) => {
      if (!user) {
        return reply(Boom.notFound('Wrong email or password'));
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return reply(Boom.unauthorized('Wrong email or password'));
      }

      const token = JWT.sign({ email: user.email }, secret, { expiresIn });
      return reply({ token, user: sanitizeUser(user) });
    });
}
