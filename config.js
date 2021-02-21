module.exports =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api'
    : 'https://apiwalletsoap.herokuapp.com/api';
