import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

(async () => {
    const options: DataSourceOptions & SeederOptions = {
        type: 'postgres',
        url: process.env.CONNECTION_STRING,
        entities: ['/seed/dist/src/entities/*.js'],
        seeds: ['/seed/dist/src/database/seed/*.seeder{.ts,.js}'],
        seedTracking: false,
    };

    const dataSource = new DataSource(options);
    await dataSource.initialize();

    runSeeders(dataSource);
})();
