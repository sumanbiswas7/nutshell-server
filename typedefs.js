const { gql } = require("apollo-server");

const typeDefs = gql`
  type Dish {
    id: ID!
    name: String!
    description: String!
    image: String!
    price: Int!
    type: String!
    timestamp: String!
  }

  type Query {
    dishes: [Dish]
    getDish(id: ID!): Dish
  }

  input DishInput {
    id: ID
    name: String!
    # description: String!
    # image: String!
    # price: Int!
    # type: String!
    # timestamp: String!
  }

  type Mutation {
    addDish(dish: DishInput): String
    deleteDish(id: ID!): String
  }
`;

module.exports = { typeDefs };
