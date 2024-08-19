import { extendType, intArg, nonNull, objectType } from 'nexus';

import { User } from '../entities/User';
import { Vote } from '../entities/Vote';
import { Context } from '../types/Context';

export const VoteType = objectType({
    name: 'Vote',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.int('cardId');
        t.nonNull.int('boardId');
        t.nonNull.int('userId');
        t.field('user', {
            type: 'User',
            resolve(parent, _args, _context, _info): Promise<User | null> {
                return User.findOne({ where: { id: parent.userId } });
            },
        });
    },
});

export const VoteQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('getVotesByCardId', {
            type: 'Vote',
            args: {
                cardId: nonNull(intArg()),
            },
            async resolve(_parent, args, context: Context, _info): Promise<Vote[] | []> {
                const { cardId } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return Vote.find({ where: { cardId } }) || [];
            },
        });
    },
});

export const VoteMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('addVoteToCard', {
            type: 'Vote',
            args: {
                cardId: nonNull(intArg()),
                boardId: nonNull(intArg()),
                userId: nonNull(intArg()),
            },
            async resolve(_parent, args, context: Context, _info): Promise<Vote> {
                const { boardId, cardId, userId } = args;
                const { userId: contextUserId } = context;

                if (!userId || !contextUserId || userId !== contextUserId) {
                    throw new Error("Can't vote without logging in");
                }

                return await Vote.create({ boardId, cardId, userId }).save();
            },
        });
        t.nullable.field('subtractVoteFromCard', {
            type: 'Vote',
            args: {
                cardId: nonNull(intArg()),
                boardId: nonNull(intArg()),
                userId: nonNull(intArg()),
            },
            async resolve(_parent, args, context: Context, _info): Promise<Vote | null> {
                const { boardId, cardId, userId } = args;
                const { userId: contextUserId } = context;

                if (!userId || !contextUserId || userId !== contextUserId) {
                    throw new Error("Can't vote without logging in");
                }

                const vote = await Vote.findOne({ where: { boardId, cardId, userId } });
                if (vote) {
                    if (vote) {
                        await Vote.remove(vote);
                    }
                }

                return vote;
            },
        });
    },
});
