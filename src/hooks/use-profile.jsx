import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCallback } from "react";

const refCollection = collection(db, "profile");

export function useProfile() {
  const getProfile = useCallback(async (uid) => {
    const docRef = doc(refCollection, uid);
    const snapshot = await getDoc(docRef);
    const profile = snapshot.data();
    return profile;
  }, []);

  const setProfile = useCallback(async (uid, profile) => {
    const docRef = doc(refCollection, uid);
    return setDoc(docRef, profile);
  }, []);

  return {
    getProfile,
    setProfile,
  };
}
