// import { app } from "../firebase";
const { app } = require("../firebase");
const {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  addDoc,
  updateDoc,
} = require("firebase/firestore");

const resolvers = {
  Query: {
    dishes: async () => {
      try {
        const dishesRef = collection(getFirestore(), "dishes");
        const querySnapshot = await getDocs(
          query(dishesRef, orderBy("timestamp", "desc"))
        );
        const POSTS = [];
        querySnapshot.forEach((doc) => {
          POSTS.push(doc.data());
        });
        return POSTS;
      } catch (error) {
        console.error(`QueryError: (dishes) ${error}`);
      }
    },
  },
  Mutation: {
    addDish: async (parent, args, ctx) => {
      try {
        const { name } = args.dish;
        const res = await addDoc(collection(getFirestore(), "dishes"), {
          name: name,
          timestamp: new Date(),
        });
        console.log("Added document with ID: ", res.id);
        const newDocRef = doc(getFirestore(), "dishes", res.id);
        await updateDoc(newDocRef, {
          id: res.id,
        });
        return `Dish sucessfuly added with ID: ${res.id}`;
      } catch (error) {
        console.error(`MutationError: (addDish) ${error}`);
      }
    },
  },
};

module.exports = { resolvers };
