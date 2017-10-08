import Boom from 'boom';

import User from '../db/models/user';
import Conversation from '../db/models/conversation';

export default async function (request, reply) {
  await User.findOne({ email: request.auth.credentials.email }).populate('conversations').then(
    (user) => {
      if (user) {
        const isConversationExist = user.conversations.filter(conversation => (
            conversation.userOneId === request.payload.friendId ||
            conversation.userTwoId === request.payload.friendId
          ),
    ).length > 0;
        if (isConversationExist) {
          reply(Boom.badData('You already have conversation with this user'));
        } else {
          User.findById(request.payload.friendId).then(
            (friend) => {
              const newConversation = new Conversation({
                userOneId: user._id,
                userTwoId: friend._id,
              });
              newConversation.save().then((conversation) => {
                user.conversations.push(conversation);
                user.save();
                friend.conversations.push(conversation);
                friend.save();

                reply({ id: conversation._id, friendId: friend._id });
              });
            },
          );
        }
      } else {
        reply(Boom.notFound('Cannot find user'));
      }
    },
  );
}
