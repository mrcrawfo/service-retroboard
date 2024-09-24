# service-retroboard

## Introduction
service-retroboard is the foundation of a versatile web application designed for conducting retrospectives in Agile methodologies. It also offers flexible presets for various collaborative activities such as brainstorming, SWOT analysis, and pros/cons evaluations. This standalone app is part of a monorepo containing both the frontend UI and backend server.

## Current Features
- User registration and authentication
- Board creation with various presets (retrospectives, brainstorming, SWOT analysis, team icebreakers, etc)
- Card creation, deletion, grouping, and voting within boards
- Basic card sorting (based on creation order, vote count, or random)
- Editing - Board/Column renaming and card text updates
- Multiple preset board types with named and colored columns

## Installation
_TODO: Installation instructions are pending and will be added in a future update._

## Technology Stack
### Frontend
- React with TypeScript
- Vite for building and serving
- Material UI for component library
- Zod for form validation
- dnd-kit for drag-and-drop functionality
- TanStack Router for page navigation and redirection

### Backend
- Apollo Server for GraphQL API
- TypeORM for database interactions
- PostgreSQL as the database

## Current Limitations (Version 1.0)
The service-retroboard app is currently in its initial stage of development, which comes with a few limitations. At present, the app operates in what we call "Single Player Mode" - this means that while multiple users can access the same board simultaneously, changes made by one user are not reflected in real-time for others. This limitation affects the collaborative nature of the app, particularly for distributed teams working remotely.

Another aspect to note is the current access model. All registered users have universal access to all boards and cards within the system. While this simplifies usage for small teams or personal use, it doesn't provide the level of privacy and access control that larger organizations or teams working on sensitive projects might require.

It's also worth mentioning that the current version does not include unit tests for either the frontend or backend components. While the app is functional, the lack of a comprehensive test suite may impact the reliability and maintainability of the codebase as it grows.

## Roadmap for Version 2.0
Looking ahead to version 2.0, we have exciting plans to address those known limitations and add new features to enhance the service-retroboard experience. A key focus will be implementing real-time collaboration capabilities. We plan to integrate WebSocket functionality to manage application state and sync changes from multiple users in real-time, allowing for truly collaborative sessions.

To address the current universal access model, we're designing a more detailed permissions system. This will allow users to be members of specific groups, with shared board access for team or company collaboration. This enhancement will provide the necessary privacy and access control for larger organizations or teams working on sensitive projects.

We're also planning to introduce timed phases during collaborative sessions. This feature will include the ability to visually obscure other users' cards until all entries are complete, promoting independent thinking before group discussion. Similarly, we'll be enhancing the voting system to display the number of votes cast or remaining, based on the known number of members in predefined groups.

A stretch goal for version 2.0 would be to allow users to create and save custom board presets, providing even more flexibility for different types of collaborative sessions. User-created board templates might then become a shared resource available to all users.

Importantly, we recognize the need for a robust testing strategy. Version 2.0 will include the implementation of backend unit tests and frontend Storybook tests for atomic components. This addition will significantly improve the reliability and maintainability of the codebase.

Finally, we're considering integrating the project with CircleCI for improved development and true deployment workflow, although this may be pushed to a later version depending on development priorities.
