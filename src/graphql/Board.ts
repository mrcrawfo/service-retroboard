import { arg, extendType, intArg, list, nonNull, objectType, stringArg } from 'nexus';

import { Board } from '../entities/Board.js';
import { BoardColumn } from '../entities/BoardColumn.js';
import { Card } from '../entities/Card.js';
import { User } from '../entities/User.js';
import { Context } from '../types/Context.js';
import { ColumnPresetTypeInput } from './ColumnPreset.js';

export const BoardType = objectType({
    name: 'Board',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nullable.list.field('cards', {
            type: 'Card',
            resolve(parent, _args, _context, _info): Promise<Card[]> {
                return Card.find({ where: { boardId: parent.id } });
            },
        });
        t.nullable.list.field('columns', {
            type: 'BoardColumn',
            resolve(parent, _args, _context, _info): Promise<BoardColumn[]> {
                return BoardColumn.find({ where: { boardId: parent.id } });
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

export const BoardQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('getBoards', {
            type: 'Board',
            resolve(_parent, _args, context: Context, _info): Promise<Board[]> {
                // return Board.find();
                const { conn, userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return conn.query('select * from board');
            },
        });
        t.nonNull.list.field('getBoardsByUserId', {
            type: 'Board',
            resolve(_parent, _args, context: Context, _info): Promise<Board[]> {
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return Board.find({ where: { creatorId: userId } });
                // return conn.query('select * from board where creatorId=' + userId) || [];
            },
        });
        t.field('getBoard', {
            type: 'Board',
            args: {
                id: nonNull(intArg()),
            },
            resolve(_parent, args, context: Context, _info): Promise<Board | null> {
                const { id } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return Board.findOne({ where: { id } }) || null;
            },
        });
    },
});

export const BoardMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createBoard', {
            type: 'Board',
            args: {
                name: nonNull(stringArg()),
                columns: nonNull(list(arg({ type: ColumnPresetTypeInput }))),
            },
            async resolve(_parent, args, context: Context, _info): Promise<Board> {
                const { name } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't create board without logging in");
                }

                const board: Board = await Board.create({ name, cards: [], columns: [], creatorId: userId }).save();

                const columns: BoardColumn[] = [];
                for (let i = 0; i < args.columns.length; i++) {
                    const column: BoardColumn = args.columns[i];
                    const newColumn = await BoardColumn.create({
                        name: column.name,
                        boardId: board.id,
                        creatorId: userId,
                        color: column.color,
                        slot: i + 1,
                    }).save();
                    columns.push(newColumn);
                }

                board.columns = columns;

                return Board.save(board);
            },
        });
        t.nonNull.field('updateBoardName', {
            type: 'Board',
            args: {
                id: nonNull(intArg()),
                name: nonNull(stringArg()),
            },
            async resolve(_parent, args, context: Context, _info): Promise<Board> {
                const { id, name } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't update board name without logging in");
                }

                const board: Board = await Board.findOne({ where: { id } });

                if (!board) {
                    throw new Error("Can't update board that doesn't exist");
                }

                if (board.creatorId !== userId) {
                    throw new Error("Can't update board that isn't yours");
                }

                board.name = name;

                return await Board.save(board);
            },
        });
        // TODO: deleteBoard (?)
    },
});
