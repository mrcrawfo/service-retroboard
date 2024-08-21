import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

import { Board } from './Board.js';
import { Card } from './Card.js';
import { User } from './User.js';

@Entity()
export class BoardColumn extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    creatorId!: number;

    @ManyToOne('User', 'boards')
    creator: Relation<User>;

    @Column()
    boardId!: number;

    @ManyToOne('Board', 'Columns')
    board: Relation<Board>;

    @OneToMany('Card', 'column')
    cards: Relation<Card>[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
