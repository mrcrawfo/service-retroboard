import { enumType, extendType, intArg, nonNull, objectType, stringArg } from 'nexus';

import { Board } from '../entities/Board.js';
import { BoardColumn } from '../entities/BoardColumn.js';
import { Card } from '../entities/Card.js';
import { User } from '../entities/User.js';
import { Context } from '../types/Context.js';

export const ThemeColorName = enumType({
    name: 'ThemeColorName',
    members: ['Blue', 'Orange', 'Red', 'Green', 'Purple', 'Yellow'],
});

export const BoardColumnType = objectType({
    name: 'BoardColumn',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.int('slot');
        t.nonNull.list.int('cardIds', {
            resolve(parent, _args, _context, _info): Promise<number[]> {
                return Card.find({ where: { columnId: parent.id } }).then((cards) => cards.map((card) => card.id));
            },
        });
        t.nullable.list.field('cards', {
            type: 'Card',
            resolve(parent, _args, _context, _info): Promise<Card[]> {
                return Card.find({ where: { columnId: parent.id } });
            },
        });
        t.nonNull.int('boardId');
        t.nullable.field('board', {
            type: 'Board',
            resolve(parent, _args, _context, _info): Promise<Board | null> {
                return Board.findOne({ where: { id: parent.boardId } });
            },
        });
        t.nullable.field('color', {
            type: 'ThemeColorName',
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

export const BoardColumnQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('getColumnsByBoardId', {
            type: 'BoardColumn',
            args: {
                boardId: nonNull(intArg()),
            },
            resolve(_parent, args, context: Context, _info): Promise<BoardColumn[]> {
                const { boardId } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return BoardColumn.find({ where: { boardId } });
            },
        });
        t.field('getColumn', {
            type: 'BoardColumn',
            args: {
                id: nonNull(intArg()),
            },
            resolve(_parent, args, context: Context, _info): Promise<BoardColumn | null> {
                const { id } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return BoardColumn.findOne({ where: { id } }) || null;
            },
        });
    },
});

export const BoardColumnMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createColumn', {
            type: 'BoardColumn',
            args: {
                name: nonNull(stringArg()),
                boardId: nonNull(intArg()),
                slot: nonNull(intArg()),
            },
            resolve(_parent, args, context: Context, _info): Promise<BoardColumn> {
                const { name, boardId } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't create column without logging in");
                }

                return BoardColumn.create({ name, boardId, creatorId: userId }).save();
            },
        });
        // TODO: updateColumn (?)
        // TODO: deleteColumn (?)
    },
});
