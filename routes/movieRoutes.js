const express = require("express");
const Movie = require("../models/Movie");
const router = express.Router();

// 1. FETCH ALL MOVIES (READ)
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find();
        console.log("Total Movies Fetched:", movies.length);
        res.status(200).json({ message: "Movies fetched successfully", total: movies.length, data: movies });
    } catch (error) {
        console.log("Fetch Error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// 2. SEARCH MOVIE BY NAME (READ)
router.get("/search/:name", async (req, res) => {
    try {
        const movie = await Movie.findOne({ name: { $regex: req.params.name, $options: "i" } });
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        res.status(200).json({ message: "Movie fetched successfully", data: movie });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 3. FETCH MOVIE BY ID (READ)
router.get("/id/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        res.status(200).json({ message: "Movie fetched successfully", data: movie });
    } catch (error) {
        res.status(400).json({ message: "Invalid Movie ID" });
    }
});

// 4. ADD NEW MOVIE (CREATE)
router.post("/add", async (req, res) => {
    try {
        const { name, director, year, genre, rating, language, description } = req.body;
        if (!name || !director || !year || !genre || rating === undefined || !language) {
            return res.status(400).json({ message: "Please enter all required movie details" });
        }
        const newMovie = new Movie({ name, director, year, genre, rating, language, description });
        await newMovie.save();
        console.log("--------------------------------\nNEW MOVIE ADDED\nMovie Name:", name, "\n--------------------------------");
        res.status(201).json({ message: "Movie added successfully", data: newMovie });
    } catch (error) {
        console.log("Add Movie Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// 5. UPDATE MOVIE (UPDATE)
router.put("/edit/:id", async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after", runValidators: true });
        if (!updatedMovie) return res.status(404).json({ message: "Movie not found" });
        console.log("--------------------------------\nMOVIE UPDATED\nMovie Name:", updatedMovie.name, "\n--------------------------------");
        res.status(200).json({ message: "Movie updated successfully", data: updatedMovie });
    } catch (error) {
        console.log("Update Error:", error.message);
        res.status(400).json({ message: "Unable to update movie", error: error.message });
    }
});

// 6. DELETE MOVIE (DELETE)
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ message: "Movie not found" });
        console.log("--------------------------------\nMOVIE DELETED\nMovie Name:", deletedMovie.name, "\n--------------------------------");
        res.status(200).json({ message: "Movie deleted successfully", data: deletedMovie });
    } catch (error) {
        console.log("Delete Error:", error.message);
        res.status(400).json({ message: "Invalid Movie ID" });
    }
});

module.exports = router;
