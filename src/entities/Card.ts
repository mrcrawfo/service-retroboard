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
import { BoardColumn } from './BoardColumn.js';
import { User } from './User.js';
import { Vote } from './Vote.js';

@Entity()
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @Column()
    columnId!: number;

    @ManyToOne('BoardColumn', 'cards')
    column: Relation<BoardColumn>;

    @Column()
    boardId!: number;

    @ManyToOne('Board', 'cards')
    board: Relation<Board>;

    @Column('int', { array: true })
    voteIds!: number[];

    @OneToMany('Vote', 'card')
    votes: Relation<Vote>[];

    @Column()
    creatorId!: number;

    @ManyToOne('User', 'cards')
    creator: Relation<User>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
