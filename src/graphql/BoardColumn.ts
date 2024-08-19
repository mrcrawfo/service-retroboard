import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';

import { Board } from '../entities/Board';
import { BoardColumn } from '../entities/BoardColumn';
import { Card } from '../entities/Card';
import { User } from '../entities/User';
import { Context } from '../types/Context';

export const BoardColumnType = objectType({
    name: 'BoardColumn',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
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
