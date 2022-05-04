// const { app } = require("../firebase");
require("../firebase");
const {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
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
    getByType: async (parent, args, ctx) => {
      try {
        const dishesRef = collection(getFirestore(), "dishes");
        const querySnapshot = await getDocs(
          query(dishesRef, where("type", "==", args.type))
        );
        const POSTS = [];
        querySnapshot.forEach((doc) => {
          POSTS.push(doc.data());
        });
        return POSTS;
      } catch (error) {
        console.error(`QueryError: (getByType) ${error}`);
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
    deleteDish: async (parent, args, ctx) => {
      try {
        await deleteDoc(doc(getFirestore(), "dishes", args.id));
        return `Dish with ID: ${args.id} deleted successfully`;
      } catch (error) {
        console.error(`MutationError: (deleteDish) ${error}`);
      }
    },
    updateDish: async (parent, args, ctx) => {
      try {
        const { id } = args.dish;
        const docRef = doc(getFirestore(), "dishes", id);
        await updateDoc(docRef, args.dish);
        return `Dish with ID: ${id} updated successfully`;
      } catch (error) {
        console.error(`MutationError: (updateDish) ${error}`);
      }
    },
  },
};

module.exports = { dishServerResolvers };
