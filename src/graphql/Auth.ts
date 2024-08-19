import argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { extendType, nonNull, objectType, stringArg } from 'nexus';

import { User } from '../entities/User';
import { Context } from '../types/Context';

export const AuthType = objectType({
    name: 'AuthType',
    definition(t) {
        t.nonNull.string('token');
        t.nonNull.field('user', {
            type: 'User',
        });
    },
});

export type Auth = { user: Promise<User> } & { token: string | undefined | null };

export const AuthQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('me', {
            type: 'User',
            async resolve(_parent, _args, context: Context, _info): Promise<User | null> {
                const { userId } = context;

                if (!userId) {
                    throw new Error("Can't query without logging in");
                }

                return User.findOne({ where: { id: userId } });
            },
        });
    },
});

export const AuthMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('login', {
            type: 'AuthType',
            args: {
                username: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(_parent, args, _context: Context, _info): Promise<{ token: string; user: User } | null> {
                const { username, password } = args;
                const user = await User.findOne({ where: { username } });

                if (!user) {
                    throw new Error('User not found');
                }

                const isValid = await argon2.verify(user.password, password);

                if (!isValid) {
                    throw new Error('Incorrect password');
                }

                const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET as jwt.Secret) || null;

                if (token) {
                    return {
                        user,
                        token,
                    };
                }

                return null;
            },
        });
        t.nonNull.field('register', {
            type: 'AuthType',
            args: {
                username: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(_parent, args, context: Context, _info): Promise<{ token: string; user: User } | null> {
                const { username, password, email } = args;
                const hashedPassword = await argon2.hash(password);
                let user: User;
                let token: string;

                try {
                    const result = await context.conn
                        .createQueryBuilder()
                        .insert()
                        .into(User)
                        .values({ username, email, password: hashedPassword })
                        .returning('*')
                        .execute();

                    user = result.raw[0];
                    token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET as jwt.Secret) || '';
                } catch (err) {
                    console.log(err);
                }

                if (user && token) {
                    return {
                        user,
                        token,
                    };
                }

                return null;
            },
        });
        // TODO: Add logout mutation
    },
});
