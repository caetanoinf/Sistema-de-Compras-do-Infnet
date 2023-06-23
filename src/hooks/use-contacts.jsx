import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../firebase";

const refCollection = collection(db, "suppliers");

export function useContacts() {
  const addContact = useCallback(async (supplierId, contact) => {
    const supplierRef = doc(refCollection, supplierId);
    const contactsRef = collection(supplierRef, "contacts");
    return addDoc(contactsRef, contact);
  }, []);

  const removeContact = useCallback(async (supplierId, contactId) => {
    const supplierRef = doc(refCollection, supplierId);
    const contactRef = doc(collection(supplierRef, "contacts"), contactId);
    return deleteDoc(contactRef);
  }, []);

  const editContact = useCallback(async (supplierId, contactId, updatedContact) => {
    const supplierRef = doc(refCollection, supplierId);
    const contactRef = doc(collection(supplierRef, "contacts"), contactId);
    return updateDoc(contactRef, updatedContact);
  }, []);

  return {
    addContact,
    removeContact,
    editContact,
  };
}
