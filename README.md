# Code Forum

## Installing & Running

```
// Backend

cd backend/
yarn/npm install

// Frontend

cd frontend/
yarn/npm install

// Database
cd database/
./build.sh

// Running (at repository root!)

npm run bg_dev // In one terminal
npm run front_dev // In another terminal
```

## Technology choices

For this project, I chose to use the following stack: SQLite for the database, React for the frontend and Express with TypeScript for the backend.

SQLite was chosen for its portability and ease of use. React was chosen because it is the industry standard for the frontend framework. And lastly, Express was chosen because it was heavily utilized on the course.

The project is located in a single mono repo. Repository root contains `package.json` file which has a couple of scripts to run the project. These scripts are described in the section above.

## Point Estimate

- Basic features: 25
- React: 5
- Voting (partial): 2?
