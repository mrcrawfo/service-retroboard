import { extendType, intArg, list, nonNull, objectType, stringArg } from 'nexus';

import { Board } from '../entities/Board.js';
import { BoardColumn } from '../entities/BoardColumn.js';
import { Card } from '../entities/Card.js';
import { User } from '../entities/User.js';
import { Vote } from '../entities/Vote.js';
import { Context } from '../types/Context.js';

export const CardType = objectType({
    name: 'Card',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('text');
        t.nonNull.int('boardId');
        t.field('board', {
            type: 'Board',
            resolve(parent, _args, _context, _info): Promise<Board | null> {
                return Board.findOne({ where: { id: parent.boardId } });
            },
        });
        t.nonNull.int('columnId');
        t.field('column', {
            type: 'BoardColumn',
            resolve(parent, _args, _context, _info): Promise<BoardColumn | null> {
                return BoardColumn.findOne({ where: { id: parent.columnId } });
            },
        });
        t.nonNull.list.field('votes', {
            type: 'Vote',
            resolve(parent, _args, _context, _info): Promise<Vote[]> {
                return Vote.find({ where: { cardId: parent.id } });
            },
        });
        t.nonNull.list.field('groupedCardIds', {
            type: 'Int',
            resolve(parent, _args, _context, _info): number[] {
                return parent.groupedCardIds;
            },
        });
        t.nonNull.int('creatorId');
        t.field('creator', {
            type: 'User',
            resolve(parent, _args, _context, _info): Promise<User | null> {
                return User.findOne({ where: { id: parent.creatorId } });
            },
        });
    },
});

export const CardDeleteResponse = objectType({
    name: 'CardDeleteResponse',
    definition(t) {
        t.nonNull.boolean('success');
        t.nullable.string('message');
    },
});

export const MoveCardResponse = objectType({
    name: 'MoveCardResponse',
    definition(t) {
        t.nonNull.boolean('success');
        t.nullable.string('message');
    },
});

export const GroupCardResponse = objectType({
    name: 'GroupCardResponse',
    definition(t) {
        t.nonNull.boolean('success');
        t.nullable.string('message');
    },
});

export const CardQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('getCardsByBoardId', {
            type: 'Card',
            args: {
                boardId: nonNull(intArg()),
            },
            resolve(_parent, args, context: Context, _info): Promise<Card[]> {
                const { boardId } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return Card.find({ where: { boardId } });
            },
        });
        t.field('getCard', {
            type: 'Card',
            args: {
                id: nonNull(intArg()),
            },
            resolve(_parent, args, context: Context, _info): Promise<Card | null> {
                const { id } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return Card.findOne({ where: { id } }) || null;
            },
        });
    },
});

export const CardMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createCard', {
            type: 'Card',
            args: {
                text: nonNull(stringArg()),
                boardId: nonNull(intArg()),
                columnId: nonNull(intArg()),
            },
            resolve(_parent, args, context: Context, _info): Promise<Card> {
                const { text, boardId, columnId } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't create card without logging in");
                }

                return Card.create({
                    text,
                    boardId,
                    columnId,
                    creatorId: userId,
                    voteIds: [],
                    groupedCardIds: [],
                }).save();
            },
        });
        t.nonNull.field('updateCard', {
            type: 'Card',
            args: {
                id: nonNull(intArg()),
                text: nonNull(stringArg()),
            },
            async resolve(_parent, args, context: Context, _info): Promise<Card> {
                const { id, text } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't create card without logging in");
                }

                const card: Card = await Card.findOne({ where: { id } });

                if (!card) {
                    throw new Error("Can't update card that doesn't exist");
                }

                if (card.creatorId !== userId) {
                    throw new Error("Can't update card that isn't yours");
                }

                card.text = text;

                return await Card.save(card);
            },
        });
        t.nonNull.field('deleteCard', {
            type: 'CardDeleteResponse',
            args: {
                id: nonNull(intArg()),
            },
            async resolve(_parent, args, context: Context, _info) {
                const { id } = args;
                const { userId } = context;

                if (!userId) {
                    return { success: false, message: "Can't create card without logging in" };
                }

                const card: Card = await Card.findOne({ where: { id } });

                if (!card) {
                    return { success: false, message: "Can't update card that doesn't exist" };
                }

                if (card.creatorId !== userId) {
                    return { success: false, message: "Can't update card that isn't yours" };
                }

                // TODO: Delete votes or cascade (?)

                await Card.remove(card);

                return { success: true };
            },
        });
        t.nonNull.field('moveCard', {
            type: 'MoveCardResponse',
            args: {
                cardId: nonNull(intArg()),
                fromColumnId: nonNull(intArg()),
                toColumnId: nonNull(intArg()),
            },
            async resolve(_parent, args, context: Context, _info) {
                const { cardId, fromColumnId, toColumnId } = args;
                const { userId } = context;

                if (!userId) {
                    return { success: false, message: "Can't move card without logging in" };
                }

                const card: Card = await Card.findOne({ where: { id: cardId } });

                if (!card) {
                    return { success: false, message: "Can't move card that doesn't exist" };
                }

                if (card.creatorId !== userId) {
                    return { success: false, message: "Can't move card that isn't yours" };
                }

                const fromColumn: BoardColumn = await BoardColumn.findOne({ where: { id: fromColumnId } });
                const toColumn: BoardColumn = await BoardColumn.findOne({ where: { id: toColumnId } });

                if (!fromColumn) {
                    return { success: false, message: "Can't move card from column that doesn't exist" };
                }

                if (!toColumn) {
                    return { success: false, message: "Can't move card to column that doesn't exist" };
                }

                // remove cardId from all groupedCardIds in fromColumn
                const boardCards = await Card.find({ where: { boardId: card.boardId } });
                for (const groupedCard of boardCards) {
                    if (groupedCard.groupedCardIds.includes(card.id)) {
                        groupedCard.groupedCardIds = groupedCard.groupedCardIds.filter((id) => id !== card.id);
                        if (groupedCard.groupedCardIds.length === 1) {
                            groupedCard.groupedCardIds = [];
                        }
                        await Card.save(groupedCard);
                    }
                }

                card.columnId = toColumnId;
                card.groupedCardIds = [];
                await Card.save(card);

                return { success: true };
            },
        });
        t.nonNull.field('groupCard', {
            type: 'GroupCardResponse',
            args: {
                cardId: nonNull(intArg()),
                fromColumnId: nonNull(intArg()),
                toColumnId: nonNull(intArg()),
                groupedCardIds: nonNull(list(nonNull(intArg()))),
            },
            async resolve(_parent, args, context: Context, _info) {
                const { cardId, fromColumnId, toColumnId, groupedCardIds } = args;
                const { userId } = context;

                if (!userId) {
                    return { success: false, message: "Can't move card without logging in" };
                }

                const card: Card = await Card.findOne({ where: { id: cardId } });

                if (!card) {
                    return { success: false, message: "Can't move card that doesn't exist" };
                }

                if (card.creatorId !== userId) {
                    return { success: false, message: "Can't move card that isn't yours" };
                }

                const fromColumn: BoardColumn = await BoardColumn.findOne({ where: { id: fromColumnId } });
                const toColumn: BoardColumn = await BoardColumn.findOne({ where: { id: toColumnId } });

                if (!fromColumn) {
                    return { success: false, message: "Can't move card from column that doesn't exist" };
                }

                if (!toColumn) {
                    return { success: false, message: "Can't move card to column that doesn't exist" };
                }

                const boardCards = await Card.find({ where: { boardId: card.boardId } });

                if (fromColumnId !== toColumnId && toColumnId !== card.columnId) {
                    // remove cardId from all groupedCardIds in fromColumn
                    for (const groupedCard of boardCards) {
                        if (groupedCard.groupedCardIds.includes(card.id)) {
                            groupedCard.groupedCardIds = groupedCard.groupedCardIds.filter((id) => id !== card.id);
                            if (groupedCard.groupedCardIds.length === 1) {
                                groupedCard.groupedCardIds = [];
                            }
                            await Card.save(groupedCard);
                        }
                    }

                    card.columnId = toColumnId;
                    await Card.save(card);
                }

                for (const newGroupCardId of groupedCardIds) {
                    const newGroupCard = await Card.findOne({ where: { id: newGroupCardId } });
                    if (groupedCardIds.includes(newGroupCard.id)) {
                        newGroupCard.groupedCardIds = groupedCardIds;
                        await Card.save(newGroupCard);
                    }
                }

                return { success: true };
            },
        });
    },
});
