module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,

  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entity',
    subscribersDir: 'src/subscriber',
  },
  entities:
    process.env.NODE_ENV === 'test'
      ? ['src/entitys/**/*.ts']
      : ['dist/src/entitys/**/*.js'],
  migrations:
    process.env.NODE_ENV === 'test'
      ? ['src/migrations/**/*.ts']
      : ['dist/src/migrations/**/*.js'],
};
