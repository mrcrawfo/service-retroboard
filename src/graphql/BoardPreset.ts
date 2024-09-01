import { extendType, nonNull, objectType, stringArg } from 'nexus';

import { BoardPreset } from '../entities/BoardPreset.js';
import { ColumnPreset } from '../entities/ColumnPreset.js';
import { Context } from '../types/Context.js';

export const BoardPresetType = objectType({
    name: 'BoardPreset',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.string('description');
        t.nonNull.list.int('columnIds', {
            resolve(parent, _args, _context, _info): Promise<number[]> {
                return ColumnPreset.find({ where: { board: parent.id } }).then((cards) => cards.map((card) => card.id));
            }
        });
        t.nonNull.list.field('columns', {
            type: 'ColumnPreset',
            resolve(parent, _args, _context, _info): Promise<ColumnPreset[]> {
                return ColumnPreset.find({ where: { board: parent.id } });
            },
        });
    },
});

export const BoardPresetQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('getBoardPresets', {
            type: 'BoardPreset',
            resolve(_parent, _args, context: Context, _info): Promise<BoardPreset[]> {
                const { conn, userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return conn.query('select * from board_preset');
            },
        });
    },
});

export const BoardPresetMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createBoardPreset', {
            type: 'BoardPreset',
            args: {
                name: nonNull(stringArg()),
                description: nonNull(stringArg()),
                // columns: nonNull(ColumnPresetArg()),
            },
            resolve(_parent, args, context: Context, _info): Promise<BoardPreset> {
                const { name, description } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't create board preset without logging in");
                }

                return BoardPreset.create({ name, description }).save();
            },
        });
    },
});