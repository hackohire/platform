module.exports.getEnvVars = () => {
  return {
    dev: {
      MONGODB_URL: 'mongodb://localhost:27017/serverlessgraphqlboilerplate',
      AUTH0_CLIENT_ID: '',
      AUTH0_CLIENT_SECRET: '',
    },
    prod: {
      MONGODB_URL: 'mongodb://localhost:27017/serverlessgraphqlboilerplate',
      AUTH0_CLIENT_ID: '',
      AUTH0_CLIENT_SECRET: '',
    },
  };
};
