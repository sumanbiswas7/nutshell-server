// const { app } = require("../firebase");
require("../firebase");
const {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  addDoc,
  getDoc,
  updateDoc,
} = require("firebase/firestore");

const dishServerResolvers = {
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
    getDish: async (parent, args, ctx) => {
      try {
        const docRef = doc(getFirestore(), "dishes", args.id);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
      } catch (error) {
        console.error(`QueryError: (getDish) ${error}`);
      }
    },
  },
  Mutation: {
    addDish: async (parent, args, ctx) => {
      try {
        const { name, description, image, price, type } = args.dish;
        const res = await addDoc(collection(getFirestore(), "dishes"), {
          name,
          description,
          image,
          price,
          type,
          timestamp: new Date(),
        });
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

module.exports = { dishServerResolvers };
