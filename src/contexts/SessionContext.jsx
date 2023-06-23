import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useProfile } from "../hooks/use-profile";

const SessionContext = createContext({ authenticatedUser: null, authenticating: true });

export function SessionProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [authenticating, setAuthenticating] = useState(true);
  const { getProfile } = useProfile();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const profile = await getProfile(user.uid);
        setAuthenticatedUser({ ...user, profile });
      } else {
        setAuthenticatedUser(user);
      }

      setAuthenticating(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <SessionContext.Provider value={{ authenticatedUser, authenticating }}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}
