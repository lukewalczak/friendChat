import Boom from 'boom';
import User from '../db/models/user';

export default async function (request, reply) {
  if (request.auth.credentials.email !== request.payload.email) {
    await User.findOne({ email: request.auth.credentials.email }).then(
      (user) => {
        if (user) {
          User.findOne({ email: request.payload.email }).then(
            (friend) => {
              if (friend) {
                const stringId = `${friend._id}`;
                const friendExists = user.friends.filter(f => `${f}` === stringId).length > 0;
                if (!friendExists) {
                  user.friends.push(friend);
                  user.save();
                  reply({ friend: { fullName: friend.fullName, _id: friend._id } });
                } else {
                  reply(Boom.conflict('You have added already this friend'));
                }
              } else {
                reply(Boom.notFound(`Friend ${request.payload.email} doesn't exist`));
              }
            },
          );
        } else {
          reply(Boom.notFound('Cannot find user'));
        }
      },
    );
  } else {
    reply(Boom.conflict('Cannot add yourself as a friend'));
  }
}
