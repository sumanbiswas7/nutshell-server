const { dishes } = require("../model/localDishData");

const dishLocalResolvers = {
  Query: {
    dishes: () => dishes,
    getDish: (parent, args, ctx) => {
      return dishes.find((o) => o.id == args.id);
    },
    getByType: (parent, args, ctx) => {
      return dishes.filter((o) => o.type == args.type);
    },
  },
  Mutation: {
    addDish: () => `You can not add dish on local versions`,
  },
};

module.exports = { dishLocalResolvers };
