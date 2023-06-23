import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./use-auth";
import { useCallback } from "react";

const refCollection = collection(db, "suppliers");

export function useSuppliers() {
  const { authenticatedUser } = useAuth();
  const userId = authenticatedUser?.uid;

  const getSuppliers = useCallback(async () => {
    const q = query(refCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const suppliers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return suppliers;
  }, [userId]);

  const createSupplier = useCallback(
    async (supplier) => {
      const timestamp = serverTimestamp();
      return addDoc(refCollection, { ...supplier, timestamp, userId });
    },
    [userId]
  );

  const deleteSupplier = useCallback(async (id) => {
    return deleteDoc(doc(refCollection, id));
  });

  const updateSupplier = useCallback(async (id, supplier) => {
    return updateDoc(doc(refCollection, id), supplier);
  });

  return {
    getSuppliers,
    createSupplier,
    deleteSupplier,
    updateSupplier,
  };
}
