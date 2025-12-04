require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bookdb";
connectDB(MONGO_URI);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Routes
const booksRouter = require("./routes/book.route");
app.use("/api/books", booksRouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Book API is running" });
});

// Error handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
