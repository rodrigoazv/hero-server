module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entity',
    subscribersDir: 'src/subscriber',
  },
  entities: ['dist/src/entitys/**/*.js'],

  migrations: ['dist/src/migrations/**/*.js'],
};
