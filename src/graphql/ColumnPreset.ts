import { extendType, inputObjectType, nonNull, objectType, stringArg } from 'nexus';

import { BoardPreset } from '../entities/BoardPreset.js';
import { ColumnPreset } from '../entities/ColumnPreset.js';
import { Context } from '../types/Context.js';

export const ColumnPresetTypeInput = inputObjectType({
    name: 'ColumnPresetTypeInput',
    definition(t: any): any {
        // t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.string('color');
        // t.nonNull.int('boardId');
    },
});

export const ColumnPresetType = objectType({
    name: 'ColumnPreset',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.string('color');
        t.nonNull.int('boardId');
        t.nonNull.field('board', {
            type: 'BoardPreset',
            resolve(parent, _args, _context, _info): Promise<BoardPreset[]> {
                return BoardPreset.find({ where: { columns: parent.id } });
            },
        });
    },
});

export const ColumnPresetQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('getColumnPresets', {
            type: 'ColumnPreset',
            resolve(_parent, _args, context: Context, _info): Promise<ColumnPreset[]> {
                // return Board.find();
                const { conn, userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return conn.query('select * from column_preset');
            },
        });
    },
});

export const ColumnPresetMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createColumnPreset', {
            type: 'ColumnPreset',
            args: {
                name: nonNull(stringArg()),
                color: nonNull(stringArg()),
            },
            resolve(_parent, args, context: Context, _info): Promise<ColumnPreset> {
                const { name, color } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't create column preset without logging in");
                }

                return ColumnPreset.create({ name, color }).save();
            },
        });
    },
});
