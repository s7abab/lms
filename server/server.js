const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const http = require("http");
// .env Config
dotenv.config();
// MongoDb Connection
connectDB();

const app = express();
;
// Middlewares
app.use(
  "/images",
  express.static(path.join(__dirname, "../backend/public/images"))
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
//Routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
});
//Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.PORT}`);
});
