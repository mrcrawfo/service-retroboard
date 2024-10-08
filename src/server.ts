import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';

import { schema } from './schema.js';
import typeormConfig from './typeorm.config.js';
import { Context } from './types/Context.js';
import { auth } from './utils/auth.js';

dotenv.config();

const init = async () => {
    const conn = await typeormConfig.initialize();
    const server = new ApolloServer({
        schema,
        context: async ({ req }): Promise<Context> => {
            // TODO: Validate authorization header (confirm actual token, not 'Authorization null')
            const token = (authorization: string) => (authorization ? auth(authorization) : null);
            return {
                conn,
                userId: token(req?.headers?.authorization)?.userId,
                tokenExpired: token(req?.headers?.authorization)?.message === 'jwt expired',
            };
        },
    });

    server.listen(process.env.GRAPHQL_PORT || 4000).then(({ url }) => {
        console.log(`Server started - listening on ${url}`);
    });
};

init();
