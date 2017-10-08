import Boom from 'boom';
import User from '../db/models/user';

export default async function (request, reply) {
  await User.findOne({ email: request.auth.credentials.email }).populate('conversations').then(
    (user) => {
      if (user) {
        const conversations = user.conversations.map((conversation) => {
          const friendId = `${user._id}` === conversation.userOneId ?
            conversation.userTwoId : conversation.userOneId;
          return {
            id: conversation._id,
            friendId,
          };
        });
        reply(conversations);
      } else {
        reply(Boom.notFound('Cannot find user'));
      }
    },
  );
}
