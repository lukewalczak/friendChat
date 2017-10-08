import Boom from 'boom';
import User from '../db/models/user';

export default async function (request, reply) {
  await User.findOne({ email: request.auth.credentials.email }).populate('friends', 'fullName').then(
    (user) => {
      if (user) {
        const mappedFriends = {};
        user.friends.forEach((friend) => {
          mappedFriends[friend._id] = friend;
        });
        reply(mappedFriends);
      } else {
        reply(Boom.notFound('Cannot find user'));
      }
    },
  );
}
