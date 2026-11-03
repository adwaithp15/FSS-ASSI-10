const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    language: { type: String, required: true },
    description: { type: String, default: "No description available" }
});

module.exports = mongoose.model("Movie", movieSchema);
