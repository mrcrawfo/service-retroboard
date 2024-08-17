import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Board } from './Board';
import { Card } from './Card';
import { User } from './User';

@Entity()
export class BoardColumn extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    creatorId!: number

    @ManyToOne(() => User, (user) => user.boards)
    creator: User

    @Column()
    boardId!: number

    @ManyToOne(() => Board, (board) => board.columns)
    board: Board

    @OneToMany(() => Card, (card) => card.column)
    cards: Card[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
