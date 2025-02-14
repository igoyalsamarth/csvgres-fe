import { setAuthToken } from "@/lib/axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export const useAuthToken = () => {
  const { getToken, isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    const setToken = async () => {
      try {
        if (isLoaded && isSignedIn) {
          const token = await getToken();
          if (token) {
            setAuthToken(token);
          }
        } else {
          setAuthToken(null); // Clear token if not signed in
        }
      } catch (error) {
        console.error('Error setting auth token:', error);
        setAuthToken(null);
      }
    };
    setToken();
  }, [getToken, isSignedIn, isLoaded]);

  return { isSignedIn, isLoaded };
};