const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./typedefs");
const { dishServerResolvers } = require("./resolvers/dishServerResolver");
const { dishLocalResolvers } = require("./resolvers/dishLocalResolver");

// https://nutshell-server-api.herokuapp.com/

const server = new ApolloServer({
  typeDefs,
  resolvers: dishServerResolvers,
  cors: {
    origin: "*",
    credentials: true,
  },
});

server.listen({ port: process.env.PORT || 5000 }).then((res) => {
  console.log(`🚀 GraphQL Server is running at ${res.url}`);
});
