# Northcoders News API

## Project Initialisation :clapper:

1. Run `npm install` to pull in dependencies (inc. dev dependencies)

```json
"devDependencies":
    {
        "jest": "^27.5.1", // testing suite
        "jest-extended": "^2.0.0", // enhanced assertions
        "pg-format": "^1.0.4" // psql preformatting of SQL queries
        "husky": "^8.0.2", // pre-commit testing
    },
"dependencies":
    {
        "dotenv": "^16.0.0", // .env library for environment variables
        "pg": "^8.7.3" // node-postgres libary for PSQL interaction
    }
```

2. Create two environment variables files (e.g. `.env.*ENVIRONMENT_NAME*` ) for test and development databases into `PGDATABASE` variable.

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
