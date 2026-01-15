📈 Stock Analysis Web Application
Overview

Stock Analysis Web Application is a full-stack MERN-based web platform designed to help users analyze real-time and historical stock market data through an intuitive, responsive, and secure interface. The application enables users to visualize stock trends, compare two stocks side-by-side, and explore market performance with optimized data handling and modern UI enhancements, including Three.js-powered interactive visuals.

The project focuses on secure authentication, efficient API integration, and clean frontend-backend architecture, making it a production-ready stock analytics dashboard.

Features

Secure Authentication System – JWT-based login & signup with encrypted passwords and protected routes.

Real-Time Stock Analysis – Fetches and displays live stock prices and key market metrics.

Historical Data Visualization – Analyze past stock performance using charts and data-driven insights.

Stock Comparison Dashboard – Compare two different stocks side-by-side within a single unified view.

Interactive UI & Visuals – Enhanced user experience using Three.js for dynamic visual components.

Responsive Design – Fully optimized for desktop, tablet, and mobile devices.

Optimized API Handling – Efficient data fetching and rendering for smooth performance.

Clean MERN Architecture – Seamless integration between frontend and backend.

Technology Stack
Category	Technology
Frontend	React (Vite)
Styling	Tailwind CSS
3D Graphics	Three.js
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ODM)
Authentication	JWT, bcrypt.js
API Handling	Axios
Installation

Before running the project locally, ensure you have the following installed:

Node.js (LTS)

MongoDB (Local or Atlas)

Git

Then follow these steps:

# Clone the repository
git clone https://github.com/Sanjay9176/StockAnalysis-Webpage.git
cd StockAnalysis-Webpage

Backend Setup
cd server
npm install


Create a .env file inside the server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STOCK_API_KEY=your_stock_api_key


Start the backend server:

npm start


👉 Backend will run at: http://localhost:5000

Frontend Setup
cd client
npm install
npm run dev


👉 Frontend will run at: http://localhost:5173

How to Run the Project

Start MongoDB (local service or Atlas cluster)

Run the backend server

Run the frontend development server

Register a new account or login

Search stocks, view analytics, and compare performance

Authentication Flow

User credentials are encrypted using bcrypt

JWT token is generated on successful login

Token is used to protect private routes

Unauthorized users are restricted from accessing secured pages

Stock Comparison Module

Select any two stocks

View both stock trends side-by-side

Analyze price movement and performance metrics

Designed for clarity and faster decision-making

Future Enhancements

Advanced technical indicators (RSI, MACD, Moving Averages)

Watchlist & favorites feature

Stock price alerts and notifications

AI-based market trend prediction

Cloud deployment and CI/CD pipeline


Learning Outcomes

Practical MERN stack development

Secure authentication & authorization

Efficient API integration and async handling

Responsive UI design with Tailwind CSS

Real-world usage of Three.js in web applications

Code

👉 https://github.com/Sanjay9176/StockAnalysis-Webpage

[Sanjay Kumar Purohit]
