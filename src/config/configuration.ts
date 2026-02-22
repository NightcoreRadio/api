export default () => ({
  port: parseInt(<string>process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  nodeEnv: process.env.NODE_ENV || 'development',
});
