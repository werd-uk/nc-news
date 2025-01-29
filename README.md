# Northcoders News API

## Project Initialisation :clapper:

1. Run `npm install` to pull in dependencies (inc. dev dependencies), ensure your `package.json` file contains the correct packages:

```json
    "devDependencies": {
        "dotenv": "^16.4.7",
        "husky": "^8.0.2",
        "jest": "^27.5.1",
        "jest-extended": "^2.0.0",
        "pg-format": "^1.0.4",
        "jest-sorted": "^1.0.15",
        "supertest": "^7.0.0"
    },
    "dependencies": {
        "nodemon": "^3.1.9",
        "express": "^4.21.2",
        "pg": "^8.7.3"
    }
```

2. Create two environment variables files (e.g. `.env.ENVIRONMENT_NAME` ) for test and development databases into `PGDATABASE` variable.

```js
// for test environment
// filename: .env.test
PGDATABASE = your_db_name_test; // ⬅️ File contents

// for dev environment
// filename: .env.development
PGDATABASE = your_db_name; // ⬅️ File contents
```

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
