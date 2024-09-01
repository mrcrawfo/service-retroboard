import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { ThemeColorName } from './BoardColumn.js';
import { BoardPreset } from './BoardPreset.js';

@Entity()
export class ColumnPreset extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    color!: ThemeColorName;

    @Column()
    boardId!: number;

    @ManyToOne('BoardPreset', 'columns')
    board!: Relation<BoardPreset>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
