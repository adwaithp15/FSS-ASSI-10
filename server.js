require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Serve frontend
app.use(express.static("public"));

// Connect MongoDB
connectDB();

// Movie Routes
const movieRoutes = require("./routes/movieRoutes");
app.use("/api/movies", movieRoutes);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("--------------------------------");
    console.log("MOVIE SERVER RUNNING");
    console.log(`http://localhost:${PORT}`);
    console.log("--------------------------------");
});
