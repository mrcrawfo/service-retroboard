import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Board } from "./Board";
import { BoardColumn } from "./BoardColumn";
import { User } from "./User";
import { Vote } from "./Vote";

@Entity()
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    text!: string

    @Column()
    columnId!: number

    @ManyToOne(() => BoardColumn, (column) => column.cards)
    column: BoardColumn

    @Column()
    boardId!: number

    @ManyToOne(() => Board, (board) => board.cards)
    board: Board

    @Column("int", { array: true })
    voteIds!: number[]

    @OneToMany(() => Vote, (vote) => vote.card)
    votes: Vote[]

    @Column()
    creatorId!: number

    @ManyToOne(() => User, (user) => user.cards)
    creator: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
