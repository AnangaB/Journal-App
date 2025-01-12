# Journaling App

A full-stack journaling app for Android and IOS, built using React Native, Expo Go and TypeScript, with a backend powered by Express.js, PostgreSQL, and the `pg` library.

## Features currently include:
- Create a textual journal entry associtated with a date
- Edit any existing journal entry
- Delete any existing journal entry
- All create, edit, and delete operations affect the database directly, ensuring real-time updates and data persistence.

## Current Status
This project is a work in progress. I am currently working on implementing Strava API to my app, so that whenever a daily journal entry is created, any fitness activity done on that day is automatically imported to that entry. I am hoping to use these daily fitness data, to gain insights and trends in the user's fitness history, and display this visually to the user.

# **How to Run the App**

Follow these steps to set up and run the journaling app on your local machine. The project is organized into two folders: `frontend` (for the display of the app) and `backend` (for the API and database operations).

## **Prerequisites**
1. **Install Node.js and npm**  
2. **Install Docker**  
3. **Install Expo Go App** (on your mobile device)  

---

## **Steps to Run the App**

### 1. **Set Up the Database**
1. Ensure you have **PostgreSQL** set up on your system, either locally or through Docker. If using Docker, simply click **Run** to start the PostgreSQL container.(I used Docker)
2. Verify the PostgreSQL container is running:
   ```bash
   docker ps
   ```
3. Use a database management tool (e.g., pgAdmin, TablePlus, etc.) to connect and inspect the database, if needed. I used pgadmin.


## 2. Run the Backend
1. Navigate to the backend folder:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Start the backend server:
```bash
npm run dev
```
4. The backend should now be running at `http://localhost:5000`. Additionally, ensure you configure the following environment variables in the backend `.env` file, using data from when configuring PostgreSQL:
```env
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
```

## 3. Run the Frontend
1. Navigate to the frontend folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. In a different terminal, use `ngrok` to expose the backend API to a public URL:
```bash
ngrok http 5000
```
4. Copy the `ngrok` URL and create the frontend `.env` file as follows:
```env
EXPO_PUBLIC_API_ADDRESS="YOUR_NGROK_URL"
```
The backend should now be publicly accessible via the `ngrok` URL.

5. Start the Expo development server:
```bash
npx expo start
```
6. Use the Expo Go app on your mobile device to scan the QR code displayed in the terminal. ( You can also select an option at this point to run on web, but currently the date picker option only works on mobile and not in web).

With these steps, you should be able to run the journaling app locally, in it's current state.
