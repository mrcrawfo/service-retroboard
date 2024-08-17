import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Card } from "./Card";

@Entity()
export class Vote extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    cardId!: number

    @ManyToOne(() => Card, (card) => card.votes)
    card: Card

    @Column()
    boardId!: number

    @Column()
    userId!: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
