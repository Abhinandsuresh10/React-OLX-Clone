
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {collection, getDocs, getFirestore, addDoc} from "firebase/firestore";
import { ItemType } from "../Pages/Home";



const firebaseConfig = {
  apiKey: "AIzaSyDlesnu_f556kFdqHNBbmnH4IfCWPj0-ps",
  authDomain: "olx-clone-5c878.firebaseapp.com",
  projectId: "olx-clone-5c878",
  storageBucket: "olx-clone-5c878.firebasestorage.app",
  messagingSenderId: "318985975708",
  appId: "1:318985975708:web:18fe61403f8369ecb67a59",
  measurementId: "G-SBSFJF4D1D"
};

const addSampleDataWithImage = async () => {
  try {
    const productsCollection = collection(firestore, 'products');
    await addDoc(productsCollection, {
      name: "Gaming Mouse",
      price: 1500,
      description: "A high-precision gaming mouse with RGB lighting.",
      image: "https://via.placeholder.com/150"
    });
    console.log("Sample product with image added!");
  } catch (error) {
    console.error("Error adding product with image:", error);
  }
};

addSampleDataWithImage();

const fetchFromFirestore = async (): Promise<ItemType[]> => {
    try {
      const productsCollection = collection(firestore, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ItemType[]; 
      console.log("Fetched products from Firestore:", productList);
      return productList;
    } catch (error) {
      console.error("Error fetching products from Firestore:", error);
      return [];
    }
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const firestore = getFirestore(app);

export {auth, provider, storage, firestore, fetchFromFirestore}