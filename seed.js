require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("./models/Movie");

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");

        // Clear existing movie records
        await Movie.deleteMany({});

        // Adwaith's personalized movie information
        const movies = [
            {
                name: "Minnal Murali",
                director: "Basil Joseph",
                year: 2021,
                genre: "Action/Superhero",
                rating: 7.9,
                language: "Malayalam",
                description: "A tailor gains special powers after being struck by lightning."
            },
            {
                name: "Bheeshma Parvam",
                director: "Amal Neerad",
                year: 2022,
                genre: "Action/Drama",
                rating: 7.6,
                language: "Malayalam",
                description: "A former gangster turned maritime transporter is forced to revisit his past."
            },
            {
                name: "3 Idiots",
                director: "Rajkumar Hirani",
                year: 2009,
                genre: "Comedy/Drama",
                rating: 8.4,
                language: "Hindi",
                description: "Two friends search for their long lost companion and college days."
            },
            {
                name: "Kalki 2898 AD",
                director: "Nag Ashwin",
                year: 2024,
                genre: "Sci-Fi/Action",
                rating: 7.6,
                language: "Telugu/Hindi",
                description: "A modern-day avatar of Vishnu descends to Earth to protect the world."
            },
            {
                name: "Soorarai Pottru",
                director: "Sudha Kongara",
                year: 2020,
                genre: "Drama/Action",
                rating: 8.7,
                language: "Tamil",
                description: "A young man from a village dreams of starting his own airline."
            },
            {
                name: "Animal",
                director: "Sandeep Reddy Vanga",
                year: 2023,
                genre: "Action/Drama",
                rating: 6.5,
                language: "Hindi",
                description: "A son undergoes a remarkable transformation as the bond with his father fractures."
            }
        ];

        await Movie.insertMany(movies);
        console.log("Movie Data Inserted Successfully");
        console.log("Total Movies:", movies.length);
    } catch (error) {
        console.log("Seed Error:", error.message);
    } finally {
        await mongoose.connection.close();
    }
}
seedData();
