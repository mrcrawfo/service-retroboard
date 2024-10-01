import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { BoardPreset } from '../../entities/BoardPreset.js';

export default class BoardPresetSeeder implements Seeder {
    track = false;

    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(BoardPreset);
        await repository.insert([
            {
                name: 'Went Well | To Improve | Action Items',
                description:
                    'A classic retrospective format that focuses on identifying successes, areas for improvement, and concrete next steps. This template encourages teams to reflect on their achievements, pinpoint challenges, and create actionable plans for future sprints.',
                columnIds: [1, 2, 3],
                type: 'Retrospective',
                votes: 12,
            },
            {
                name: 'Start | Stop | Continue',
                description:
                    'This template helps teams identify new practices to adopt, ineffective practices to eliminate, and successful practices to maintain. It promotes continuous improvement by encouraging teams to be proactive about change and mindful of their current processes.',
                columnIds: [4, 5, 6],
                type: 'Retrospective',
                votes: 12,
            },
            {
                name: '4Ls - Liked | Learned | Lacked | Longed For',
                description:
                    'The 4Ls method provides a comprehensive view of the team’s experience. It allows members to express positive aspects, share new insights, identify shortcomings, and voice aspirations. This format encourages both reflection and forward-thinking.',
                columnIds: [7, 8, 9, 10],
                type: 'Retrospective',
                votes: 12,
            },
            {
                name: 'Pros and Cons',
                description:
                    'This template helps teams evaluate the positive and negative aspects of an idea or proposal. It encourages balanced feedback, highlighting reasons to proceed or reconsider a different course of action.',
                columnIds: [11, 12],
                type: 'Retrospective',
                votes: 12,
            },
            {
                name: 'SWOT Analysis - Strengths | Weaknesses | Opportunities | Threats',
                description:
                    'A SWOT analysis is a strategic planning tool that helps identify a project’s internal strengths and weaknesses, as well as external opportunities and threats. This template is useful for assessing potential new directions or next steps for a project.',
                columnIds: [13, 14, 15, 16],
                type: 'Project Management',
                votes: 12,
            },
            {
                name: 'Agile Kanban',
                description:
                    'A Kanban board is a visual project management tool that helps teams track work and optimize their processes. This template provides a simple yet effective format for managing tasks, visualizing workflow, and improving team collaboration.',
                columnIds: [17, 18],
                type: 'Project Management',
                votes: 12,
            },
        ]);
    }
}
