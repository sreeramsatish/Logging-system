//Setup Instructions
/Step 1: Clone the Repository

git clone <repository-url>

cd project

/Step 2: Environment Configuration
Create .env files in both frontend and backend directories.

/Backend .env
"MONGODB_URI=mongodb://localhost:27017/logging_system
JWT_SECRET=abcd1234
PORT=3001"

/Frontend .env

"VITE_API_URL=http://localhost:3001"

/Step 3: Install Dependencies
1. Backend

"cd backend
npm install"

2. Frontend
"cd ../frontend
npm install"

Step 4: Running the Project
Option 1: Development Mode (Without Docker)
1. Start MongoDB (in a separate terminal)
"mongod"

2. Backend
"cd backend
npm start"

3. Frontend
"cd frontend
npm run dev"

-The frontend will be accessible at http://localhost:3000.
-The backend API will be accessible at http://localhost:3001.

Option 2: Docker Mode
To use Docker, ensure Docker is installed, then build and run the containers:

"docker-compose up --build"

-The frontend will be available at http://localhost:3000.
-The backend API will be available at http://localhost:3001.

Usage
-Register a User: Send a POST request to /api/auth/register with a JSON body containing username, password, and role.
-Login: Send a POST request to /api/auth/login with username and password to receive a JWT token.
-View Logs: Authenticated users can view logs via /api/logs.
-Delete Logs: Users can delete logs they own or, if they are admin, any log.

//Additional Notes
-JWT Secret: Update JWT_SECRET in .env for added security.
-Export Logs: Logs can be exported as JSON or CSV by sending a GET request to /api/logs/export.

//Future Enhancements
1. Add user profile management
2. Expand export options (e.g., Excel)
