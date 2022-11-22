import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIyGHwXF-p5FoaeoaN3Mmc2ie-lyVUSrg",
  authDomain: "todo-today-cf12d.firebaseapp.com",
  projectId: "todo-today-cf12d",
  storageBucket: "todo-today-cf12d.appspot.com",
  messagingSenderId: "890544215787",
  appId: "1:890544215787:web:b963511c19dc24d9b9d0ae",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function sendData(todos) {
  try {
    todos = Object.assign({}, todos);
    const docRef = await addDoc(collection(db, "todos"), todos);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getData() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  if (querySnapshot.size == 0) return null;
  querySnapshot.forEach((doc) => {
    const query = doc.data();
    console.dir(query);
    return query;
  });
  return querySnapshot;
}
