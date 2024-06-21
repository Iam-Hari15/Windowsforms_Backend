Sure! Here is the detailed README for the Node.js backend server:

---

# SlidelyFormsBackend

## Overview

SlidelyFormsBackend is a Node.js server built with Express and TypeScript. It handles form submissions from the SlidelyFormsApp and stores the data in a JSON file. The server provides endpoints to submit and retrieve form data.

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

- Node.js and npm (Node Package Manager)

## Getting Started

### Step 1: Set Up the Project Directory

1. **Open Command Prompt:**
   - Press `Win + R`, type `cmd`, and press Enter.

2. **Navigate to the Desktop:**
   - In Command Prompt, navigate to the Desktop directory:
     ```sh
     cd %USERPROFILE%\Desktop
     ```

3. **Create the Project Directory:**
   - Create a new directory named `slidely-backend` and navigate into it:
     ```sh
     mkdir slidely-backend
     cd slidely-backend
     ```

### Step 2: Initialize the Node.js Project

1. **Initialize a Node.js Project:**
   - Initialize a new Node.js project with default settings:
     ```sh
     npm init -y
     ```

2. **Install Necessary Dependencies:**
   - Install Express, TypeScript, and other necessary dependencies:
     ```sh
     npm install express typescript ts-node @types/node @types/express
     ```

3. **Set Up TypeScript Configuration:**
   - Create a `tsconfig.json` file in the `slidely-backend` directory with the following content:
     ```json
     {
       "compilerOptions": {
         "target": "ES6",
         "module": "commonjs",
         "outDir": "./dist",
         "rootDir": "./src",
         "strict": true,
         "esModuleInterop": true
       }
     }
     ```

### Step 3: Create the Backend Server Files

1. **Create the `src` Directory:**
   - Create a `src` directory and navigate into it:
     ```sh
     mkdir src
     cd src
     ```

2. **Create the `index.ts` File:**
   - Create an `index.ts` file with the following content:
     ```typescript
     import express from 'express';
     import fs from 'fs';
     import path from 'path';

     const app = express();
     const PORT = 3000;
     const dbFilePath = path.join(__dirname, 'db.json');

     app.use(express.json());

     app.get('/ping', (req, res) => {
         res.send(true);
     });

     app.post('/submit', (req, res) => {
         const { name, email, phone, github_link, stopwatch_time } = req.body;
         const newSubmission = { name, email, phone, github_link, stopwatch_time };

         let submissions = [];
         if (fs.existsSync(dbFilePath)) {
             submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
         }

         submissions.push(newSubmission);
         fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));

         res.status(201).send('Submission successful');
     });

     app.get('/read', (req, res) => {
         const index = parseInt(req.query.index as string, 10);
         if (fs.existsSync(dbFilePath)) {
             const submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
             if (index >= 0 && index < submissions.length) {
                 res.send(submissions[index]);
             } else {
                 res.status(404).send('Submission not found');
             }
         } else {
             res.status(404).send('No submissions found');
         }
     });

     app.listen(PORT, () => {
         console.log(`Server is running on http://localhost:${PORT}`);
     });
     ```

3. **Create the `db.json` File:**
   - In the `src` directory, create an empty `db.json` file:
     ```sh
     echo [] > db.json
     ```

### Step 4: Running the Backend Server

1. **Compile TypeScript and Run the Server:**
   - Navigate back to the root directory of `slidely-backend`:
     ```sh
     cd ..
     ```
   - Compile the TypeScript files and run the server using `ts-node`:
     ```sh
     npx ts-node src/index.ts
     ```

2. **Verify the Server is Running:**
   - Open a web browser and navigate to `http://localhost:3000/ping`. You should see `true` displayed.

### Endpoints

- **GET `/ping`:** 
  - A simple endpoint to check if the server is running. Always returns `true`.
  - Example: `http://localhost:3000/ping`

- **POST `/submit`:**
  - Accepts a JSON body with `name`, `email`, `phone`, `github_link`, and `stopwatch_time` fields and stores it in `db.json`.
  - Example:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "1234567890",
      "github_link": "https://github.com/johndoe",
      "stopwatch_time": "00:01:19"
    }
    ```
  - Use this endpoint to submit form data from the frontend application.

- **GET `/read`:**
  - Accepts a query parameter `index` to retrieve a specific submission from `db.json`.
  - Example: `http://localhost:3000/read?index=0`

### Additional Notes

- Ensure your backend server is running on `http://localhost:3000` when testing the frontend application.
- If you need to stop the server, press `Ctrl + C` in the Command Prompt where the server is running.

---

