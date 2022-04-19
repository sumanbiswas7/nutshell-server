const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./typedefs");
const { resolvers } = require("./resolvers/dishResolver");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "*",
    credentials: true,
  },
});

server.listen({ port: process.env.PORT || 5000 }).then((res) => {
  console.log(`🚀 GraphQL Server is running at ${res.url}`);
});
