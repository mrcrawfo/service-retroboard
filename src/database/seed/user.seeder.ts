import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../entities/User.js';

export default class UserSeeder implements Seeder {
    track = false;

    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(User);
        await repository.insert([
            {
                username: 'admin',
                password:
                    '$argon2id$v=19$m=65536,t=3,p=4$ifWfiLDWePT51dP8oQAclQ$KozgeSxyJNQkbZcm7I+wGcCBMDi8AGrMq9P36e+B5UE',
                email: 'user@test.com',
            },
        ]);
    }
}
