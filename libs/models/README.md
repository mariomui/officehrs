# models

- [models](#models)
  - [Onboarding](#onboarding)
    - [Troubleshooting Onboarding](#troubleshooting-onboarding)
    - [Diagnostic Feedback Tools](#diagnostic-feedback-tools)
  - [Usage](#usage)
    - [Running custom prisma commands (WIP)](#running-custom-prisma-commands-wip)
  - [Running](#running)
    - [Generate Models for use](#generate-models-for-use)
    - [connect to db](#connect-to-db)
  - [OTHER SHIT](#other-shit)
    - [Running unit tests](#running-unit-tests)
    - [Running lint](#running-lint)

## Onboarding

* Create a database in supabase
* Go to db setting in supabase and find the URI connection string
  * ie:
    * `postgres://postgres:[password]@[hash].supabase.co:5432/postgres`
* Connect
  * create a .env file in the root of your lib entity or app entity
    * DATABASE_URL= <--- Place the DB URI string
* Initial schema sync to online DB
  * Do a db push either with the nx provided script or manually
    * manual:
      * `npx prisma db push --schema [locationofSchema] --accept-data-loss`
    * Via my script:
      * `npx nx run models:db-push`
* Initial Seed
  * `npx nx run models:db-seed`

### Troubleshooting Onboarding

* wipe database and reseed
  * `npx nx run models:migrate-reset`
* overwrite your local schema with ONLINE schema
  * `npx nx run models:migrate-sync`

### Diagnostic Feedback Tools

* DB Records Viewer
  * `npx nx run models:prisma-studio`
* Schema Visualizer
  * `https://prisma-erd.simonknott.de`
    * paste your schema.prisma into site for an ERD diagram

## Usage

### Running custom prisma commands (WIP)

- prisma is an ORM
- `prisma db push`
  - allows us to push schema changes to the db.
- `prisma migrate dev`
  - allows us to do db push with migrational records
  - DO NOT USE UNTIL finish prototyping
  - `prisma migrate dev` and `prisma migrate reset` automatically run the seeding script unless the scripts have skip-seeding on them
- `prisma migrate reset`
  - actions:
    - Drops the database/schema¹ if possible, or performs a soft reset if the environment does not allow deleting databases/schemas¹
    - Creates a new database/schema¹ with the same name if the database/schema¹ was dropped
    - Applies all migrations
    - Runs seed scripts
- `prisma migrate sync`
  - pulls the online database, and overwrites our schema with whatever our database has

## Running

---

When you want to use prisma migrate dev or prisma migrate reset without seeding, you can pass the --skip-seed flag.

Insert Prisma URI
```.env  
DATABASE_URL=
```

### Generate Models for use

`npm run prisma:generate`

### connect to db

either spin up a postgresql docker or connect to supabase

## OTHER SHIT

### Running unit tests

Run `nx test models` to execute the unit tests via [Jest](https://jestjs.io).

### Running lint

Run `nx lint models` to execute the lint via [ESLint](https://eslint.org/).
