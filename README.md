MemoDeck
---
Digital Garden for Thinkers — Just note it.

<u>PROJECT OVERVIEW</u>
---

MemoDeck is a simple, high-performance notes application built with the MERN stack. It is designed for users who want a clean, distraction-free environment to organize thoughts through nested folders and markdown support.
<u>Key Features</u>

1.<b>Folders & Notes</b>:Create unlimited nested folders to organize complex thoughts.

2.<b>Markdown Support</b>: Write and render notes using standard markdown syntax.

3.<b>Instant Search</b>: Quickly find any note or folder across your entire account.

4.<b>Session Persistence</b>: Stay logged in securely even after refreshing the page.

5.<b>Smart Organization</b>: Star essential notes as favorites or archive completed work.

6.<b>Responsive UI: Optimized for a seamless experience on mobile, tablet, and desktop.

<u>Tech Stack</u>
---

Frontend: React, Tailwind CSS , DaisyUi.

Backend: Node.js, Express, MongoDB, MongooseORM.

Authentication: JWT (JSON Web Tokens) with LocalStorage persistence.

<u>Getting Started</u>
---

1. Clone the project

git clone [https://github.com/yourusername/memodeck.git](https://github.com/yourusername/memodeck.git)
cd memodeck


2. Backend Setup

Navigate to the folder: cd backend

Install dependencies: npm install

Create a .env file:

PORT=8000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key


Start the server: npm start

3. Frontend Setup

Navigate to the folder: cd frontend

Install dependencies: npm install

Create a .env file:

VITE_API_BASE_URL=http://localhost:8000/api/v1


Start the app: npm run dev

<u>Deployment</u>
---

Frontend: Deploy to Vercel. Ensure vercel.json is included to handle SPA routing.

Backend: Deploy to Render or Heroku. Ensure your frontend URL is whitelisted in the backend CORS settings.

