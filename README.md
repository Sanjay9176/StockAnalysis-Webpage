📈 Stock Analysis Web Application
————————————————————————

Overview
Stock Analysis Web Application is a full-stack MERN-based platform designed to analyze real-time and historical stock market data through a secure, responsive, and visually engaging interface. The application allows users to visualize stock trends, compare two stocks side-by-side, and explore market performance using optimized APIs and modern UI techniques, including Three.js-powered interactive visuals.

The project emphasizes secure authentication, efficient data handling, and seamless frontend-backend integration, making it a production-ready stock analytics solution.

Key Features

• Secure authentication using JWT with encrypted passwords and protected routes
• Real-time stock price analysis with live market data
• Historical stock performance visualization
• Side-by-side stock comparison in a single dashboard
• Interactive UI components enhanced with Three.js
• Fully responsive design for desktop and mobile devices
• Optimized API calls for smooth performance
• Clean and scalable MERN architecture

Technology Stack

Frontend
React (Vite), Tailwind CSS, Three.js, Axios, React Router DOM

Backend
Node.js, Express.js

Database
MongoDB with Mongoose ODM

Authentication & Security
JWT (JSON Web Tokens), bcrypt.js

Installation

Before running the project locally, make sure the following are installed:

• Node.js (LTS)
• MongoDB (Local or Atlas)
• Git

Clone the repository and move into the project directory:

git clone https://github.com/Sanjay9176/StockAnalysis-Webpage.git
cd StockAnalysis-Webpage


Backend Setup

Navigate to the server directory and install dependencies:

cd server
npm install


Create a .env file inside the server folder and add the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STOCK_API_KEY=your_stock_api_key


Start the backend server:

npm start


Backend runs at:
http://localhost:5000

Frontend Setup

Navigate to the client directory and install dependencies:

cd client
npm install
npm run dev


Frontend runs at:
http://localhost:5173

How to Run the Project

Start MongoDB (local service or Atlas cluster)

Run the backend server

Run the frontend development server

Register a new user account or login

Search stocks, analyze trends, and compare performance

Authentication Flow

• User passwords are encrypted using bcrypt
• JWT token is generated on successful login
• Tokens secure protected routes
• Unauthorized users cannot access private pages

Stock Comparison Module

• Select any two stocks
• View both stocks in a side-by-side layout
• Analyze trends, prices, and performance metrics
• Designed for clarity and faster decision-making

Future Enhancements

• Technical indicators such as RSI, MACD, and Moving Averages
• Watchlist and favorites feature
• Price alerts and notifications
• AI-based market trend prediction
• Cloud deployment with CI/CD pipeline


Learning Outcomes

• Hands-on MERN stack development
• Secure authentication and authorization
• Real-time API integration
• Responsive UI design with Tailwind CSS
• Practical usage of Three.js in real-world applications

Code Repository

https://github.com/Sanjay9176/StockAnalysis-Webpage

Sanjay Kumar Purohit

Aspiring Full Stack Web Developer
Chennai, Tamil Nadu, India
