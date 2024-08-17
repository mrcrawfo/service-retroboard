import { DataSource } from "typeorm";
import dotenv from 'dotenv';

import { Board } from "./entities/Board";
import { BoardColumn } from "./entities/BoardColumn";
import { Card } from "./entities/Card";
import { User } from "./entities/User";
import { Vote } from "./entities/Vote";

dotenv.config();

export default new DataSource({
    type: 'postgres',
    url: process.env.CONNECTION_STRING,
    entities: [Board, BoardColumn, Card, User, Vote],
    synchronize: true,
});
