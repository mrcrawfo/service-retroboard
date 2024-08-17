import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Card } from "./Card";
import { BoardColumn } from "./BoardColumn";
import { User } from "./User";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    // TODO: User permissions

    @Column()
    name!: string

    @OneToMany(() => Card, (card) => card.board)
    cards: Card[]

    @OneToMany(() => BoardColumn, (column) => column.board)
    columns: BoardColumn[]

    @Column()
    creatorId!: number

    @ManyToOne(() => User, (user) => user.boards)
    creator: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
