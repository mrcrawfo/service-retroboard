import { extendType, intArg, nonNull, objectType } from 'nexus';

import { Board } from '../entities/Board.js';
import { Card } from '../entities/Card.js';
import { User } from '../entities/User.js';
import { Context } from '../types/Context.js';

export const UserType = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('username');
        t.nullable.string('password');
        t.nonNull.string('firstName');
        t.nonNull.string('lastName');
        t.nonNull.string('email');
        t.nullable.list.field('boards', {
            type: 'Board',
            resolve(parent, _args, _context, _info): Promise<Board[]> {
                return Board.find({ where: { creatorId: parent.id } });
            },
        });
        t.nullable.list.field('cards', {
            type: 'Card',
            resolve(parent, _args, _context, _info): Promise<Card[]> {
                return Card.find({ where: { creatorId: parent.id } });
            },
        });
    },
});

export const UserQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('getUsers', {
            type: 'User',
            resolve(_parent, _args, context: Context, _info): Promise<User[]> {
                const { conn, userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return conn.query('select * from user');
            },
        });
        t.field('getUser', {
            type: 'User',
            args: {
                id: nonNull(intArg()),
            },
            resolve(_parent, args, context: Context, _info): Promise<User | null> {
                const { id } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return User.findOne({ where: { id } }) || null;
            },
        });
    },
});

// TODO: UserMutation - deleteUser (?) - delete all boards and cards (or change ownership)
// TODO: UserMutation - updateUserPassword (?)
