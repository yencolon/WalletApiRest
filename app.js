const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const authRoutes = require('./routes/authRoutes');
const walletRouter = require('./routes/walletRoutes');
const User = require('./models/user');
const MONGODB_URI = '';

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const server = express();

const app = new ApolloServer({
  typeDefs,
  resolvers,
});

app.applyMiddleware({ app: server });

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

server.use(
  session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use((req, res, next) => {
  // throw new Error('Sync Dummy');
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// server.use('/graphql', graphqlExpress({ schema }));
// GraphiQL, a visual editor for queries
// server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.use('/auth', authRoutes);
server.use('/wallet', walletRouter);

server.listen(process.env.PORT || 5000, () => {
  console.log('running on port');
});
