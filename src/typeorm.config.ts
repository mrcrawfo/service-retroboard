import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { Board } from './entities/Board.js';
import { BoardColumn } from './entities/BoardColumn.js';
import { BoardPreset } from './entities/BoardPreset.js';
import { Card } from './entities/Card.js';
import { ColumnPreset } from './entities/ColumnPreset.js';
import { User } from './entities/User.js';
import { Vote } from './entities/Vote.js';

dotenv.config();

export default new DataSource({
    type: 'postgres',
    url: process.env.CONNECTION_STRING,
    entities: [Board, BoardColumn, BoardPreset, Card, ColumnPreset, User, Vote],
    synchronize: true,
});
