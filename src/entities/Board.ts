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

import { BoardColumn } from './BoardColumn.js';
import { Card } from './Card.js';
import { User } from './User.js';

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // TODO: User permissions

    @Column()
    name!: string;

    @Column()
    votesAllowed!: number;

    @OneToMany('Card', 'board')
    cards: Relation<Card>[];

    @OneToMany('BoardColumn', 'board')
    columns: Relation<BoardColumn>[];

    @Column()
    creatorId!: number;

    @ManyToOne('User', 'boards')
    creator: Relation<User>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
