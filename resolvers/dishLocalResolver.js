const { dishes } = require("../model/localDishData");

const dishLocalResolvers = {
  Query: {
    dishes: () => dishes,
  },
  Mutation: {
    addDish: () => `You can not add dish on local versions`,
  },
};

module.exports = { dishLocalResolvers };
