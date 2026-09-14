import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Product } from "../types/Product";

export const fetchProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, "products"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const fetchCategories = async (): Promise<string[]> => {
  const querySnapshot = await getDocs(collection(db, "products"));

  const categories = querySnapshot.docs.map(
    (doc) => doc.data().category as string,
  );

  return [...new Set(categories)];
};

export const fetchProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const productsQuery = query(
    collection(db, "products"),
    where("category", "==", category),
  );

  const querySnapshot = await getDocs(productsQuery);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const createProduct = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  const docRef = await addDoc(collection(db, "products"), product);

  return {
    id: docRef.id,
    ...product,
  };
};

export const updateProduct = async (
  id: string,
  product: Partial<Omit<Product, "id">>,
) => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, product);
};

export const deleteProduct = async (id: string) => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
};
