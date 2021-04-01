module.exports = {
  type: 'postgres',
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
  entities: ['src/entity/**/*.ts'],

  migrations: ['src/migrations/**/*.ts'],
};
