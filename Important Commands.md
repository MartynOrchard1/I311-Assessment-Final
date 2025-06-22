To init app: `npx create-adonisjs@latest product-catalog`
then run these in order: (these will install all packages)
- `npm install sqlite3`
- `npm install`

To start the app to check installation:
- `node ace serve` 
- or `node ace serve --watch` - Use this to do live development

Add this package to adonis for the login:
- `node ace add @adonisjs/auth`

Authentication Controller Creation:
- `node ace make:controller AuthController`

When making database changes:
- `node ace migration:run`

To seed in a user for DB:
- `node ace make:seeder UserSeeder` - This is to create the seeder file
- `node ace db:seed` - This tells adonis to upload the seed to the DB

Just in case you need to refresh the seed:
- `node ace migration:refresh --seed`

To Make a Model: 
- `node ace make:model Category -m`

Everytime you make a model,controller or seed:
- `node ace migration:run`
