import Boom from 'boom';
import Conversation from '../db/models/conversation';

export default async function (request, reply) {
  await Conversation.findById(request.params.conversationId).populate('messages').then(
    (conversation) => {
      if (conversation) {
        reply({ id: conversation._id, messages: conversation.messages });
      } else {
        reply(Boom.notFound('Cannot find conversations'));
      }
    },
  );
}
