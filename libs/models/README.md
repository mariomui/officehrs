# models

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test models` to execute the unit tests via [Jest](https://jestjs.io).

## Running lint

Run `nx lint models` to execute the lint via [ESLint](https://eslint.org/).

## Running custom prisma commands (WIP)

- prisma is an ORM
- db push allows us to push schema changes to the db.
- `migrate dev` allows us to do db push with a
  - `prisma migrate dev` and `prisma migrate reset` automatically run the seeding script unless the scripts have skip-seeding on them
- `npx nx run models:migrate-reset`
  - actions:
    - Drops the database/schema¹ if possible, or performs a soft reset if the environment does not allow deleting databases/schemas¹
    - Creates a new database/schema¹ with the same name if the database/schema¹ was dropped
    - Applies all migrations
    - Runs seed scripts

- `npx nx run models:migrate-dev`
  - creates migrations
- `npx nx run models:db-push`
  - prototypes schema changes
  - you can set it to drop the data if you want
- `migrate-sync`
  - pulls the database, and overwrites our schema with whatever our database has

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
