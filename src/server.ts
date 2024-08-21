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
        context: ({ req }): Context => {
            const token = req?.headers?.authorization ? auth(req.headers.authorization) : null;
            return { conn, userId: token?.userId };
        },
    });

    server.listen(process.env.GRAPHQL_PORT || 4000).then(({ url }) => {
        console.log(`Server started - listening on ${url}`);
    });
};

init();
