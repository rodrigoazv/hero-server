module.exports = {
  type: 'postgres',
  url: `${process.env.DATABASE_URL}?ssl=true`,
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entity',
    subscribersDir: 'src/subscriber',
  },
  entities: ['dist/src/entitys/**/*.js'],

  migrations: ['dist/src/migrations/**/*.js'],
};
