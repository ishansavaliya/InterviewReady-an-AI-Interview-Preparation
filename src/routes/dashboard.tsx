import { Headings } from "@/components/headings";
import { InterviewPin } from "@/components/pin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Dashboard component to display the user's interview sessions
// Shows a grid of interview cards with options to view or create new interviews
export const Dashboard = () => {
  // State management for interviews and loading state
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  // Get user ID for Firestore queries
  const { userId } = useAuth();

  // Fetch user's interviews from Firestore using real-time listener
  useEffect(() => {
    setLoading(true);

    // Create a query to fetch only this user's interviews
    const interviewQuery = query(
      collection(db, "interviews"),
      where("userId", "==", userId)
    );

    // Set up real-time listener with Firestore onSnapshot
    const unsubscribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        // Transform Firestore documents into Interview objects
        const interviewList: Interview[] = snapshot.docs.map((doc) => {
          const id = doc.id;
          return {
            id,
            ...doc.data(),
          };
        }) as Interview[];
        setInterviews(interviewList);
        setLoading(false);
      },
      (error) => {
        // Handle errors during data fetching
        console.log("Error on fetching : ", error);
        toast.error("Error..", {
          description: "SOmething went wrong.. Try again later..",
        });
        setLoading(false);
      }
    );

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, [userId]);

  return (
    <>
      {/* Header section with title and Add New button */}
      <div className="flex w-full items-center justify-between">
        {/* Dashboard title and description */}
        <Headings
          title="Dashboard"
          description="Create and start you AI Mock interview"
        />
        {/* Create new interview button */}
        <Link to={"/generate/create"}>
          <Button size={"sm"}>
            <Plus /> Add New
          </Button>
        </Link>
      </div>

      <Separator className="my-8" />

      {/* Main content section */}
      <div className="md:grid md:grid-cols-3 gap-3 py-4">
        {loading ? (
          // Show loading skeletons while data is being fetched
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-24 md:h-32 rounded-md" />
          ))
        ) : interviews.length > 0 ? (
          // Display interview cards when data is available
          interviews.map((interview) => (
            <InterviewPin key={interview.id} interview={interview} />
          ))
        ) : (
          // Show empty state when no interviews exist
          <div className="md:col-span-3 w-full flex flex-grow items-center justify-center h-96 flex-col">
            {/* Empty state illustration */}
            <img
              src="/assets/svg/not-found.svg"
              className="w-44 h-44 object-contain"
              alt=""
            />

            {/* Empty state heading */}
            <h2 className="text-lg font-semibold text-muted-foreground">
              No Data Found
            </h2>

            {/* Empty state message */}
            <p className="w-full md:w-96 text-center text-sm text-neutral-400 mt-4">
              There is no available data to show. Please add some new mock
              interviews
            </p>

            {/* Call to action button */}
            <Link to={"/generate/create"} className="mt-4">
              <Button size={"sm"}>
                <Plus className="min-w-5 min-h-5 mr-1" />
                Add New
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
