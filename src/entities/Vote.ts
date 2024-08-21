import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

import { Card } from './Card.js';

@Entity()
export class Vote extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    cardId!: number;

    @ManyToOne('Card', 'votes')
    card: Relation<Card>;

    @Column()
    boardId!: number;

    @Column()
    userId!: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
