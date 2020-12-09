const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fileStoreOptions = {
  path: './sessions',
  minTimeout: 2000,
};

const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const walletRouter = require('./routes/walletRoutes');

const server = express();
server.use(session({
  store: new FileStore(fileStoreOptions),
  secret: 'supersecrethash',
  resave: true,
  saveUninitialized: true
}));

server.use(cors())
server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json())
server.use('/auth', authRoutes);
server.use('/wallet', walletRouter);


server.listen(process.env.PORT || 5000, () => {
  console.log('running on port 3001');
});
