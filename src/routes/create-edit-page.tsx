/**
 * Create/Edit Interview Page Component
 * Handles both creation and editing of mock interviews
 * Allows users to configure interview parameters and questions
 */

import { FormMockInterview } from "@/components/form-mock-interview";
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * CreateEditPage Component
 * Manages the interview creation/editing process:
 * - Fetches existing interview data if editing
 * - Renders the interview configuration form
 * - Handles form submission and data persistence
 */
export const CreateEditPage = () => {
  // Route parameters and state management
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);

  /**
   * Effect hook to fetch interview data
   * Runs when interviewId changes
   * Only fetches data if editing an existing interview
   */
  useEffect(() => {
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchInterview();
  }, [interviewId]);

  return (
    <div className="my-4 flex-col w-full">
      {/* Interview Configuration Form */}
      <FormMockInterview initialData={interview} />
    </div>
  );
};
