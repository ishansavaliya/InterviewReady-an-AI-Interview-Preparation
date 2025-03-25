/**
 * Type Definitions
 * This file contains all the TypeScript interfaces used throughout the application
 */

import { FieldValue, Timestamp } from "firebase/firestore";

/**
 * User Interface
 * Represents a user in the application with their basic information
 */
export interface User {
  id: string; // Unique identifier for the user
  name: string; // User's full name
  email: string; // User's email address
  imageUrl: string; // URL to user's profile image
  createdAt: Timestamp | FieldValue; // When the user account was created
  updateAt: Timestamp | FieldValue; // When the user account was last updated
}

/**
 * Interview Interface
 * Represents an interview session with its configuration and questions
 */
export interface Interview {
  id: string; // Unique identifier for the interview
  position: string; // Job position being interviewed for
  description: string; // Description of the interview
  experience: number; // Years of experience required
  userId: string; // ID of the user who created the interview
  techStack: string; // Technologies being tested
  questions: { question: string; answer: string }[]; // Array of interview questions and answers
  createdAt: Timestamp; // When the interview was created
  updateAt: Timestamp; // When the interview was last updated
}

/**
 * UserAnswer Interface
 * Represents a user's answer to an interview question with feedback
 */
export interface UserAnswer {
  id: string; // Unique identifier for the answer
  mockIdRef: string; // Reference to the mock interview
  question: string; // The question that was asked
  correct_ans: string; // The correct answer to the question
  user_ans: string; // The user's provided answer
  feedback: string; // Feedback on the user's answer
  rating: number; // Rating given to the answer
  userId: string; // ID of the user who provided the answer
  createdAt: Timestamp; // When the answer was submitted
  updateAt: Timestamp; // When the answer was last updated
}
