const resolvers = {
  Query: {
    hello: () => {
      return {
        text: 'Hello world',
        views: 124,
      };
    },
  },
};

module.exports = resolvers;
