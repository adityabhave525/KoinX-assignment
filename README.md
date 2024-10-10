# 🚀 Cryptocurrency Stats API

A simple API service that fetches cryptocurrency data for Bitcoin, Ethereum, and Matic from CoinGecko, stores it in a MongoDB database, and provides endpoints to retrieve the latest stats and calculate the price deviation over the last 100 records.

## 📋 Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
-   [Available Endpoints](#available-endpoints)
    -   [/stats](#get-crypto-stats)
    -   [/deviation](#get-price-deviation)
-   [Running the Job](#background-job)
-   [License](#license)

----------

## ✨ Features

-   Fetches the latest price, market cap, and 24-hour price change of Bitcoin, Ethereum, and Matic.
-   Stores cryptocurrency data in a MongoDB database every 2 hours.
-   Provides endpoints to retrieve stats and calculate the standard deviation of prices for the last 100 records.

## 🛠️ Tech Stack

-   **Node.js**: Backend framework
-   **Express.js**: API framework
-   **MongoDB**: Database to store cryptocurrency stats
-   **CoinGecko API**: Fetches real-time cryptocurrency data
-   **Axios**: HTTP client for API requests
-   **node-cron**: For scheduling the background job
-   **Mongoose**: MongoDB ODM (Object Data Modeling)


## 🚀 Getting Started

1.  **Clone the repository**:
    
    
    
    Copy code
    
    `git clone https://github.com/your-username/crypto-stats-api.git
    cd crypto-stats-api` 
    
2.  **Install the dependencies**:
    
    
    
    Copy code
    
    `npm install` 
    
3.  **Set up MongoDB**:
    
    -   Use MongoDB Atlas or a local MongoDB server.
    -   Create a `.env` file in the root directory and add your MongoDB connection string:
        
        arduino
        
        Copy code
        
        `MONGO_URI=mongodb://your-mongo-uri-here` 
        
4.  **Start the server**:
    
    
    
    Copy code
    
    `npm start` 
    
5.  **Run the cron job**: The cron job will automatically fetch data every 2 hours and store it in the database.
    

----------

## 📊 Available Endpoints

### 📈 Get Crypto Stats

**Endpoint**: `/stats`

**Method**: `GET`

**Description**: Fetch the latest price, market cap, and 24-hour price change for the requested cryptocurrency.

**Query Params**:

-   `coin`: One of `bitcoin`, `matic-network`, or `ethereum`

**Example Request**:



Copy code

`GET /stats?coin=bitcoin` 

**Sample Response**:

json

Copy code

`{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}` 

----------

### 📉 Get Price Deviation

**Endpoint**: `/deviation`

**Method**: `GET`

**Description**: Calculate the standard deviation of the price for the requested cryptocurrency over the last 100 records.

**Query Params**:

-   `coin`: One of `bitcoin`, `matic-network`, or `ethereum`

**Example Request**:



Copy code

`GET /deviation?coin=bitcoin` 

**Sample Response**:

json

Copy code

`{
  "deviation": 4082.48
}` 

----------

## ⏲️ Background Job

-   A background job is scheduled to fetch the latest price, market cap, and 24-hour price change every 2 hours using `node-cron`.
-   The job will automatically run and store the data in MongoDB.