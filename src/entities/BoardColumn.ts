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

export enum ThemeColorName {
    Blue = 'Blue',
    Orange = 'Orange',
    Red = 'Red',
    Green = 'Green',
    Purple = 'Purple',
    Yellow = 'Yellow',
}

@Entity()
export class BoardColumn extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    slot!: number;

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

    @Column()
    color: ThemeColorName;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
