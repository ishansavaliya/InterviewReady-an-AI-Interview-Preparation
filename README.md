# InterviewReady - AI-Powered Mock Interview Platform

**Description:**  
InterviewReady is an AI-driven platform designed to help users prepare for job interviews. It provides personalized mock interview sessions, real-time feedback, and detailed performance analysis to improve interview skills. With a user-friendly interface and advanced AI capabilities, InterviewReady ensures users are well-prepared to ace their interviews.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [License](#license)

---

## Features

### Core Features

- AI-powered mock interview sessions
- Real-time feedback and performance analysis
- Personalized interview questions based on job roles and experience
- User authentication and profile management
- Dashboard to manage and track interview sessions
- Feedback reports with ratings and improvement suggestions

### Additional Features

- Speech-to-text for answer recording
- Webcam integration for a realistic interview experience
- Secure data storage with Firebase Firestore
- Responsive design for seamless use across devices

---

## Technologies Used

- **Frontend:**

  - React
  - Vite
  - Tailwind CSS
  - React Router
  - Clerk for authentication

- **Backend:**

  - Firebase Firestore
  - Firebase Authentication

- **Other Tools:**
  - TypeScript
  - Toast notifications
  - Lucide React for icons

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ishansavaliya/InterviewReady.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd InterviewReady
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**  
   Create a `.env.local` file in the root directory with the following:

   ```env

    VITE_CLERK_PUBLISHABLE_KEY=<Your Clerk Key>
    VITE_GEMINI_API_KEY=<Your GEMINI API Key>

    VITE_FIREBASE_API_KEY=<Your Firebase API Key>
    VITE_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
    VITE_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
    VITE_FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket>
    VITE_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
    VITE_FIREBASE_APP_ID=<Your Firebase App ID>
   ```

---

## Running the Project

### Development Mode

- Start the development server:

```bash
npm run dev
```

### Build for Production

- Build the project:

  ```bash
  npm run build
  ```

- Preview the production build:
  ```bash
  npm run preview
  ```

---

## License

This project is licensed under the ISC License.
