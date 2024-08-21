import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { Board } from './entities/Board.js';
import { BoardColumn } from './entities/BoardColumn.js';
import { Card } from './entities/Card.js';
import { User } from './entities/User.js';
import { Vote } from './entities/Vote.js';

dotenv.config();

export default new DataSource({
    type: 'postgres',
    url: process.env.CONNECTION_STRING,
    entities: [Board, BoardColumn, Card, User, Vote],
    synchronize: true,
});
