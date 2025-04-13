import { useClerk } from "@clerk/clerk-react";

export const useLogout = () => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return { handleLogout };
};
