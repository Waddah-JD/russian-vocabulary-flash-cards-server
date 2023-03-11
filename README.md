### Useful Commands

```bash
# start develop environment
yarn env:dev:up

# stop develop environment
yarn env:dev:down

# restart develop environment
yarn env:dev:restart
```

### Migrations

```bash
# generate a migration file
FILE_NAME=XXX yarn db:migration:generate

# run migrations
yarn db:migration:run
```

### How to run tests?

```bash
# start test environment
yarn env:test:up

# run e2e tests
yarn test:e2e
```

### First Run

```bash
# start test environment
yarn env:dev:up

# install dependencies
yarn install

# run migrations
yarn db:migration:run

# seed data
yarn seed
```
