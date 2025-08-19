# Simple 2-Tier Todo Application

This is a simple 2-tier application consisting of a Node.js backend with MongoDB and a basic HTML/CSS/JavaScript frontend.

## Features

- Add new todo items
- Mark todo items as completed/uncompleted
- Delete todo items
- Persistent storage using MongoDB

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- MongoDB (Community Server)

## Setup and Installation

1.  **Clone the repository (if applicable) or navigate to the project directory:**

    ```bash
    cd path/to/your/2-tier-app
    ```

2.  **Install Node.js dependencies:**

    Navigate to the project root directory (`f:\DevOps\2-tier`) and run:

    ```bash
    npm install
    ```

3.  **Start MongoDB:**

    Ensure your MongoDB server is running. If you installed it locally, you might start it via your system's services or by running `mongod` in your terminal.

4.  **Run the Backend Server:**

    From the project root directory, run the Node.js server:

    ```bash
    node server.js
    ```

    The server will typically run on `http://localhost:3030`.

## Usage

Once the server is running, open your web browser and navigate to `http://localhost:3030`.

-   **Add Todo:** Type your todo item in the input field and click "Add Todo".
-   **Complete/Undo Todo:** Click the "Complete" or "Undo" button next to a todo item to toggle its completion status.
-   **Delete Todo:** Click the "Delete" button next to a todo item to remove it.

## Project Structure

```
2-tier/
├── node_modules/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

-   `server.js`: The Node.js backend server with Express and MongoDB integration.
-   `public/`: Contains static frontend files.
    -   `index.html`: The main HTML file for the frontend.
    -   `style.css`: Styles for the frontend.
    -   `script.js`: Frontend JavaScript for interacting with the backend API.
-   `package.json`: Project metadata and dependencies.
-   `README.md`: This file.