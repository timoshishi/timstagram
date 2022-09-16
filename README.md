# Witter App

## Full stack boilerplate for a social media application

## Setting up your Local dev environment

Before getting started, make sure you have the following applications and packages installed on your machine

- Node
- Yarn
- Docker
- nvm
- PostgreSQL
- dotenv-cli
- aws-cli

1. Get a copy of `.env.local` from the AWS secrets manager

2. Install the Supabase CLI on your machine

   `npx i -g supabase-cli`

3. Link your project to our development server with

   `supabase link`

4. Go to the base directory and run

   `yarn setup`

5. This should set up an environment for you to work with locally. It may take a little bit the first time as supabase
   will need to pull down it's docker images to get running.

6. The Supabase CLI will output some variables in stdout that you will need to replace in your `.env.local`

   - The variables outputted will correspond to the following in `env.example`
     - anon key = `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - service_role key = `SERVICE_ROLE_KEY`
     - DB URL = `DATABASE_URL`

7. Replace the `PHOTO_BUCKET` variable in your `.env.local` with your github username

8. At this point you should be able to run `yarn dev` and have a fully functional local dev setup with a personal S3
   bucket to work against.
   - Prisma ORM will have generated the latest version of our database schema in your supabase instance.
   - Supabase will be running locally with your local Postgres setup
   - A new S3 development bucket will be set up with your github handle as the bucket name.

### Adding wiki diagrams

Diagrams for wikis can be writted using [mermaid](https://mermaid-js.gitub.io/mermaid/)

The CLI can be run with the following command

`yarn mmdc -i ./wikis/{INPUT_FILE}.md -o ./wikis/{OUTPUT_FILE}.svg`

### Local Development with Supabase and Prisma

### Migrations

1. To apply your migrations created in prisma.schema against dev, _DO NOT RUN `yarn migrate dev`_ This will wipe all
   data in the remote dev db.

2. Running them locally is easy, just run the local seed command, `yarn seed:local`, and they will show up in the local
   dev db.

- Note: this will wipe your local dev db and run a new seed command.

3. Any changes applied to your local Prisma schema will be validated and migrated on a PR.

### Getting latest changes from remote db

1. as long as your branch is up to date, you should generate the latest version of the client each time you run
   `yarn dev`

## Testing

### Coverage

- Currently local only
  - `yarn test:coverage`
- If you abort the test early, it will leave a .babelrc in the root directory. You will need to rename this back to
  `.babel__rc` this file before pushing or running the test again.

### Unit tests

- Co-located with the files that they are testing

  - Using [jest]

### Integration testing

- Co-located with the files they are testing

  - Using [jest]('jest.io') and [testing library react]('testing library react')
  - Run with `yarn test`

**Jest resolver**

- using a custom resolver due to the fact that jest-environment-jsdom is not supporting esm modules and the UUID package
  causes all tests that have dependencies on the module to fail
- [fix](https://github.com/cloudflare/miniflare/issues/271#issuecomment-1151058127 //
  https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149)

### E2E Testing

- Located in `/cypress`
  - Uses [cypress]('cypress.io')
  - To run in headed mode
    1. Run `yarn dev` and then `yarn test:e2e`
  - To run in headless mode
    1. Run `yarn e2e:headless`

### Component Testing in Storybook

Component testing with automation can be done directly in Storybook but these tests do not contribute to code coverage.

The automation is generally best used for automating actions needed to be performed each time you refresh the component
as you develop it.

- "msw" is used to capture and mock API requests and responses here.

### Creating Database types

- For now, since supabase cli is not in this project, it must be done by

1. Changing the prisma db url to the local supabase url
2. starting the local supabase instance "hd-tracker"
3. Running `npx prisma generate dev` then `npx prisma db push`
4. Next run `supabase gen types typescript --local > DatabaseTypes.ts` in the supabase project directory
5. copy the generated file to this project at src/types/database.ts

### Developing components

This project uses Storybook to develop components.

To create a new story, you can create your component then add it to the stories directory.

Then run `yarn storybook` to open the storybook.

Dates - use dateFormatter from utils which is just dayjs extended with relative times

### Feature generation

- `yarn generate:feature <FeatureName>` - creates a new feature folder and files
- `yarn generate:api <route-name>` - creates a new api route and files
- `yarn prisma generate dev` - generates the prisma schema

## CI/CD (WIP)

We are currently following a truck based model of development.... a. preview deploys with smoke tests We are using
Github Actions for our automated deployments at this time.

1. Tests are run. Failing tests will block a PR from merge.
