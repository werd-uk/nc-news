# Northcoders News App

![app version](https://img.shields.io/github/package-json/version/werd-uk/nc-news?style=flat-square) ![commit history](https://img.shields.io/github/last-commit/werd-uk/nc-news/main?style=flat-square)

## Description

This project is in its initial phase, comprising of a **postgreSQL** database, and an **express.js** server with multiple endpoints. The project is the beginnings of an application that allows users to post articles, with commentary and voting - a basic social media.

Hosted application: https://werd-nc-news.onrender.com

Project progress:

-   [x] Build & seed databases
-   [x] Build API endpoints
-   [x] Host application on Render & Superbase
-   [ ] Make enhancements to APIs
-   [ ] Build front-end

## Getting started with this project

### Project Pre-requisites

[![node.js](https://img.shields.io/badge/node.js-v22.12.0-417e38?style=flat-square&logo=node.js)](https://nodejs.org/en/download) [![postgreSQL](https://img.shields.io/badge/postgreSQL-v16.6.0-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/download/linux/ubuntu/) [![express.js](https://img.shields.io/badge/express.js-v4.21.2-000000?style=flat-square&logo=postgresql&logoColor=white)](https://expressjs.com/) [![node-postgres](https://img.shields.io/badge/node--postgres-8.7.3-blue?style=flat-square)](https://node-postgres.com/) [![dotenv](https://img.shields.io/badge/.ENV-8.7.3-ECD53F?style=flat-square&logo=.ENV&logoColor=white)](https://www.npmjs.com/package/dotenv)

---

### Want to take this project a different way?

If you fancy standing on the shoulders of giants, you can by all means fork this repository, and start your greatness from there on in.

[![Fork](https://img.shields.io/github/forks/werd-uk/nc-news?style=for-the-badge&logo=git&logoColor=white&label=fork%20me)](https://github.com/werd-uk/nc-news/fork)

Once you have forked the repository, you now have it copied into your github account, but now it's time to `clone` that repository to your machine, so you can begin working away on it.

A few things to check first:

-   Install Git: https://github.com/git-guides/install-git
-   Install your favorite code editor: https://code.visualstudio.com/
-   Link your `git` to GitHub:
    -   There's loads of ways to do this, so here's a guide: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github

### `Git` `Clone` > Do Your Work > `Add` > `Commit` > `Push` > ... Repeat

---

Now your copy of `/werd-uk/nc-news` project and now you want to get it on your machine to start coding.

To start, go to your CLI of choice and run:

-   `git clone https://github.com/your-username/your-repo-name`

All being well, your copy of your repository is now on your machine, ready for you to do great things...

Be sure to make regular "saves" back to your respository. This will help you keep a track of when and where things change, but also make your [contribution graph](https://docs.github.com/assets/cb-35216/mw-1440/images/help/profile/contributions-graph.webp) light up like a Christmas Tree. 🎄

1. Make your changes, save your code. `CTRL + S` (Win), `cmd + S` (macOS)
2. Test your code, make sure it's working as you have designed it.
    - To run the code: `node ./api/listen.js`
    - To run tests: `npm t ./__tests__/testfile.test.js`
3. Add your files to the staging environment:
    - `git add [filename.js]` to add individual files,
    - or, `git add .` to add all the changed files.
4. Commit those files to a batch, ready to push to your repository:
    - `git commit -m [message to describe change]`
    - Write commit messages in **[imperitive sentences](https://www.grammarly.com/blog/sentences/imperative-sentences/)**
5. Last step, `git push origin main` where "main" is the name of the branch you're working on. **NOTE**: 90% of the time, you're probably working on the main branch.

That's it. Your files are in your respository, with a record of the changes made to each of the files you worked on.

### Setting your package.json for project dependencies

Run `npm install` to pull in dependencies (inc. dev dependencies), ensure your `package.json` file contains the correct packages:

package.json:

```json
...
    "dependencies": {
        "dotenv": "^16.4.7",
        "express": "^4.21.2",
        "pg": "^8.7.3"
    },
    "devDependencies": {
        "husky": "^8.0.2",
        "jest": "^27.5.1",
        "jest-extended": "^2.0.0",
        "pg-format": "^1.0.4",
        "jest-sorted": "^1.0.15",
        "nodemon": "^3.1.9",
        "supertest": "^7.0.0"
    }
...
```

### Building local environements

Create two environment variable files (e.g. `.env.ENVIRONMENT_NAME` ) for test and development databases into `PGDATABASE` variable.

**NOTE**: `.env` files must sit in the root directory of your project folder.

```YAML
## for test environment
## filename .env.test
PGDATABASE=your_db_name_test; # ⬅️ File contents

## for dev environment
## filename: .env.development
PGDATABASE=your_db_name; # ⬅️ File contents
```

‼️ Environment files often contain **sensitive information** such as a database names, keys or locations. Be make sure that you add the `.env` files to the `.gitignore` file to remove them from any git commit/push process, so you don't make them available to the public.

### Seeding test data

This repository contains seed data for you to run tests against, retrieve via the API endpoints and deploy into hosted environments. Once you have installed **postgreSQL**, you will need to set up the databases by running `npm run setup-dbs`, followed by the command you wish to seed to the database.

package.json:

```json
...
 "scripts": {
        "setup-dbs": "psql -f ./db/setup.sql",
        "seed": "node ./db/seeds/run-seed.js",
        "seed-dev": "NODE_ENV=development node ./db/seeds/run-seed.js",
        "seed-prod": "NODE_ENV=production node ./db/seeds/run-seed.js",
    }
...
```

### Seed Data locations with Commands

| Data Type        | Origin | Seed data                    | Seed command        |
| ---------------- | ------ | ---------------------------- | ------------------- |
| Test Data        | local  | `./db/data/test-data`        | `npm run seed`      |
| Development Data | local  | `./db/data/development-data` | `npm run seed-dev`  |
| Production Data  | hosted | `./db/data/development-data` | `npm run seed-prod` |

## Got a question?

Feel free to get in touch by submitting a question: </br> [![issues](https://img.shields.io/github/issues/werd-uk/nc-news?style=for-the-badge)](https://github.com/werd-uk/nc-news/issues/new?template=question-about--nc-news.md)

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
