/**
 * Authentication Handler
 * This component handles user authentication state and data synchronization
 * between Clerk authentication and Firebase database
 */

import { db } from "@/config/firebase.config";
import { LoaderPage } from "@/routes/loader-page";
import { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * AuthHandler Component
 * Manages user authentication state and synchronizes user data with Firebase
 * Creates a new user document in Firebase when a user signs in for the first time
 */
const AuthHanlder = () => {
  // Get authentication state from Clerk
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  // Navigation hooks
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  // Loading state for data synchronization
  const [loading, setLoading] = useState(false);

  /**
   * Effect hook to handle user data synchronization
   * Runs when authentication state or user data changes
   */
  useEffect(() => {
    const storeUserData = async () => {
      if (isSignedIn && user) {
        setLoading(true);
        try {
          // Check if user document exists in Firebase
          const userSanp = await getDoc(doc(db, "users", user.id));

          // If user doesn't exist, create new user document
          if (!userSanp.exists()) {
            const userData: User = {
              id: user.id,
              name: user.fullName || user.firstName || "Anonymous",
              email: user.primaryEmailAddress?.emailAddress || "N/A",
              imageUrl: user.imageUrl,
              createdAt: serverTimestamp(),
              updateAt: serverTimestamp(),
            };

            // Store user data in Firebase
            await setDoc(doc(db, "users", user.id), userData);
          }
        } catch (error) {
          console.log("Error on storing the user data : ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    storeUserData();
  }, [isSignedIn, user, pathname, navigate]);

  // Show loading state while synchronizing data
  if (loading) {
    return <LoaderPage />;
  }

  return null;
};

export default AuthHanlder;
