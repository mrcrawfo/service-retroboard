import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

import { Board } from '../entities/Board';
import { BoardColumn } from "../entities/BoardColumn";
import { Card } from "../entities/Card";
import { User } from '../entities/User';
import { Vote } from '../entities/Vote';
import { Context } from '../types/Context';

export const CardType = objectType({
    name: 'Card',
    definition(t) {
        t.nonNull.int('id'),
        t.nonNull.string('text'),
        t.nonNull.int('boardId'),
        t.field('board', {
            type: 'Board',
            resolve(parent, _args, _context, _info): Promise<Board | null> {
                return Board.findOne({ where: { id: parent.boardId }});
            }
        }),
        t.nonNull.int('columnId'),
        t.field('column', {
            type: 'BoardColumn',
            resolve(parent, _args, _context, _info): Promise<BoardColumn | null> {
                return BoardColumn.findOne({ where: { id: parent.columnId }});
            }
        }),
        t.nonNull.list.field('votes', {
            type: 'Vote',
            resolve(parent, _args, _context, _info): Promise<Vote[]> {
                return Vote.find({ where: { cardId: parent.id }});
            }
        }),
        t.nonNull.int('creatorId'),
        t.field('creator', {
            type: 'User',
            resolve(parent, _args, _context, _info): Promise<User | null> {
                return User.findOne({ where: { id: parent.creatorId }});
            }
        })
    }
});

export const CardQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('getCardsByBoardId', {
            type: 'Card',
            args: {
                boardId: nonNull(intArg())
            },
            resolve(_parent, args, context: Context, _info): Promise<Card[]> {
                const { boardId } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return Card.find({ where: { boardId }});
            }
        }),
        t.field('getCard', {
            type: 'Card',
            args: {
                id: nonNull(intArg())
            },
            resolve(_parent, args, context: Context, _info): Promise<Card | null> {
                const { id } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return Card.findOne({ where: { id }}) || null;
            }
        })
    }
});

export const CardMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createCard', {
            type: 'Card',
            args: {
                text: nonNull(stringArg()),
                boardId: nonNull(intArg()),
                columnId: nonNull(intArg())
            },
            resolve(_parent, args, context: Context, _info): Promise<Card> {
                const { text, boardId, columnId } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't create card without logging in");
                }

                return Card.create({ text, boardId, columnId, creatorId: userId, voteIds: [] }).save();
            }
        }),
        t.nonNull.field('updateCard', {
            type: 'Card',
            args: {
                id: nonNull(intArg()),
                text: nonNull(stringArg())
            },
            async resolve(_parent, args, context: Context, _info): Promise<Card> {
                const { id, text } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't create card without logging in");
                }

                const card: Card = await Card.findOne({ where: { id }});

                if (!card) {
                    throw new Error("Can't update card that doesn't exist");
                }

                if (card.creatorId !== userId) {
                    throw new Error("Can't update card that isn't yours");
                }

                card.text = text;

                return await Card.save(card);
            }
        })
    }
    // TODO: deleteCard (?)
});
