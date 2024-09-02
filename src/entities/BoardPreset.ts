import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ColumnPreset } from './ColumnPreset.js';

@Entity()
export class BoardPreset extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    type!: string;

    @Column()
    votes!: number;

    @Column()
    description!: string;

    @Column('int', { array: true })
    columnIds!: number[];

    @OneToMany('ColumnPreset', 'board')
    columns!: ColumnPreset[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
