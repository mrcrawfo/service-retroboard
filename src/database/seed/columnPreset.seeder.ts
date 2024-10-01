import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ColumnPreset } from '../../entities/ColumnPreset.js';
import { ThemeColorName } from '../../entities/BoardColumn.js';

export default class ColumnPresetSeeder implements Seeder {
    track = false;

    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(ColumnPreset);
        await repository.insert([
            {
                name: 'Went Well',
                color: ThemeColorName.Blue,
                boardId: 1,
            },
            {
                name: 'To Improve',
                color: ThemeColorName.Orange,
                boardId: 1,
            },
            {
                name: 'Action Items',
                color: ThemeColorName.Purple,
                boardId: 1,
            },
            {
                name: 'Start',
                color: ThemeColorName.Blue,
                boardId: 2,
            },
            {
                name: 'Stop',
                color: ThemeColorName.Red,
                boardId: 2,
            },
            {
                name: 'Continue',
                color: ThemeColorName.Green,
                boardId: 2,
            },
            {
                name: 'Liked',
                color: ThemeColorName.Blue,
                boardId: 3,
            },
            {
                name: 'Learned',
                color: ThemeColorName.Green,
                boardId: 3,
            },
            {
                name: 'Lacked',
                color: ThemeColorName.Red,
                boardId: 3,
            },
            {
                name: 'Longed For',
                color: ThemeColorName.Orange,
                boardId: 3,
            },
            {
                name: 'Pros',
                color: ThemeColorName.Green,
                boardId: 4,
            },
            {
                name: 'Cons',
                color: ThemeColorName.Red,
                boardId: 4,
            },
            {
                name: 'Strengths',
                color: ThemeColorName.Green,
                boardId: 5,
            },
            {
                name: 'Weaknesses',
                color: ThemeColorName.Orange,
                boardId: 5,
            },
            {
                name: 'Opportunities',
                color: ThemeColorName.Blue,
                boardId: 5,
            },
            {
                name: 'Threats',
                color: ThemeColorName.Red,
                boardId: 5,
            },
            {
                name: 'To Do',
                color: ThemeColorName.Blue,
                boardId: 6,
            },
            {
                name: 'Doing',
                color: ThemeColorName.Yellow,
                boardId: 6,
            },
        ]);
    }
}
