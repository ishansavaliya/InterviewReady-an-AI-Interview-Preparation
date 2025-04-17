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

### 🔹 1. Interview Module

- AI-powered **mock interview sessions** tailored to specific job roles and experience levels  
- Dynamic question generation using **LLMs and NLP**  
- **Real-time feedback** with fluency, relevance, and confidence analysis  
- Support for **voice-based responses** via speech-to-text  
- **Session history and progress tracking** dashboard  
- Follow-up questions to simulate multi-step interviews (technical, HR, behavioral)  
- Webcam integration for **realistic interview simulation**

### 🔹 2. AI Career Chatbot

- AI-driven chatbot trained for **career guidance and interview help**  
- Users can ask **role-specific questions**, resume suggestions, or general job advice  
- Uses natural language understanding to deliver **context-aware responses**  
- Continuously improved via reinforcement learning and **user feedback**  
- Seamlessly integrated into the dashboard for quick access  
- Real-time typing animation and suggestions for enhanced UX  

### 🔹 3. Resume Builder

- Fully interactive **resume creation interface**  
- Pre-built sections: personal info, education, experience, skills, and projects  
- Real-time **resume preview panel** with responsive design  
- Option to **download resume as PDF** using `jsPDF` and `html2canvas`  
- Multiple **template styles and formatting options**  
- Resume data securely saved via **Firebase Firestore**  
- Works on mobile and desktop with responsive layout  

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
   git clone https://github.com/ishansavaliya/InterviewReady-an-AI-Interview-Preparation.git
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

---

<img width="1426" alt="Screenshot 2025-04-14 at 2 26 54 PM" src="https://github.com/user-attachments/assets/f4d2443d-39f2-49dc-92a6-87b516cb1b22" />

---

<img width="1426" alt="Screenshot 2025-04-14 at 2 29 53 PM" src="https://github.com/user-attachments/assets/7ad29652-44fe-4d97-8260-8f93f6c59ecf" />

---

<img width="1426" alt="Screenshot 2025-04-14 at 2 26 29 PM" src="https://github.com/user-attachments/assets/72aeb4a6-d605-439a-9e31-716605399198" />

---

<img width="1426" alt="Screenshot 2025-04-14 at 2 25 59 PM" src="https://github.com/user-attachments/assets/037e11c4-b6da-48ad-920f-8fa05c830dd8" />

---
