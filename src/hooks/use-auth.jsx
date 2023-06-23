import { useCallback } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useSession } from "../contexts";
import { useProfile } from "./use-profile";

export function useAuth() {
  const session = useSession();
  const profile = useProfile();

  const signIn = useCallback(({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUp = useCallback(async ({ email, password, name, role }) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    await profile.setProfile(response.user.uid, { name, role });
    return response;
  }, []);

  const signOut = useCallback(() => {
    return auth.signOut();
  }, []);

  return {
    authenticating: session.authenticating,
    authenticatedUser: session.authenticatedUser,
    isLoggedIn: !!session.authenticatedUser,
    signIn,
    signUp,
    signOut,
  };
}
