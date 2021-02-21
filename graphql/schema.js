const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type TestData {
    text: String!
    view: Int
  }

  type RootQuery {
    testData: TestData
  }

  type Query {
    hello: TestData
  }
`;

module.exports = typeDefs;
