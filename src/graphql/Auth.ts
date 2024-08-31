import argon2 from 'argon2';
import jsonwebtoken from 'jsonwebtoken';
import { extendType, nonNull, objectType, stringArg } from 'nexus';

import { User } from '../entities/User.js';
import { Context } from '../types/Context.js';

export const AuthType = objectType({
    name: 'AuthType',
    definition(t) {
        t.nullable.string('token');
        t.nullable.field('user', {
            type: 'User',
        });
        t.nullable.string('message');
        t.nullable.boolean('success');
    },
});

export type Auth = { user: Promise<User> } & { token: string | undefined | null } & {
    success?: boolean;
    message?: string;
};

export const AuthQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('me', {
            type: 'AuthType',
            async resolve(
                _parent,
                _args,
                context: Context,
                _info,
            ): Promise<{ token?: string; user?: User; message?: string; success?: boolean } | null> {
                const { userId, tokenExpired } = context;

                if (tokenExpired) {
                    return {
                        success: false,
                        message: 'Token expired',
                    };
                }

                if (!userId) {
                    return {
                        success: false,
                        message: 'Incorrect username or password',
                    };
                }

                const user = await User.findOne({ where: { id: userId } });

                if (!user) {
                    return {
                        success: false,
                        message: 'Incorrect username or password',
                    };
                }

                return {
                    success: true,
                    user,
                };
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
            async resolve(
                _parent,
                args,
                _context: Context,
                _info,
            ): Promise<{ token?: string; user?: User; message?: string; success?: boolean } | null> {
                const { username, password } = args;
                const user = await User.findOne({ where: { username } });

                if (!user) {
                    return {
                        success: false,
                        message: 'Incorrect username or password',
                    };
                }

                const isValid = await argon2.verify(user.password, password);

                if (!isValid) {
                    return {
                        success: false,
                        message: 'Incorrect username or password',
                    };
                }

                const token =
                    jsonwebtoken.sign({ userId: user.id }, process.env.TOKEN_SECRET as jsonwebtoken.Secret, {
                        expiresIn: '24h',
                    }) || null;

                if (token) {
                    return {
                        success: true,
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
                firstName: nonNull(stringArg()),
                lastName: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(
                _parent,
                args,
                context: Context,
                _info,
            ): Promise<{ token?: string; user?: User; message?: string; success?: boolean } | null> {
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
                    token =
                        jsonwebtoken.sign({ userId: user.id }, process.env.TOKEN_SECRET as jsonwebtoken.Secret, {
                            expiresIn: '24h',
                        }) || '';
                } catch (err) {
                    return {
                        success: false,
                        message: err,
                    };
                }

                if (user && token) {
                    return {
                        success: true,
                        user,
                        token,
                    };
                }

                return null;
            },
        });
    },
});
