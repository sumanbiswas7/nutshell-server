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
    addDish: () => `You can not add dish on local-server version`,
    deleteDish: () => `You can not delete dish on local-server version`,
    updateDish: () => `You can not update dish on local-server version`,
  },
};

module.exports = { dishLocalResolvers };
