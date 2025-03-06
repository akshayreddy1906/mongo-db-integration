const { initializeDatabase } = require("./db/db.connect");
// const fs = require("fs");
const Movie = require("./models/movie.models");

initializeDatabase();

// const jsonData = fs.readFileSync("movies.json");
// const moviesData = JSON.parse(jsonData);

// function seedData() {
//   try {
//     for (const movieData of moviesData) {
//       const newMovie = new Movie({
//         title: movieData.title,
//         releaseYear: movieData.releaseYear,
//         genre: movieData.genre,
//         director: movieData.director,
//         actors: movieData.actors,
//         language: movieData.language,
//         country: movieData.country,
//         rating: movieData.rating,
//         plot: movieData.plot,
//         awards: movieData.awards,
//         posterUrl: movieData.posterUrl,
//         trailerUrl: movieData.trailerUrl,
//       });
//       newMovie.save();
//     }
//   } catch (error) {
//     console.log("error seedinng the db", error);
//   }
// }

// seedData()

const newMovie = {
  title: "Salaar",
  releaseYear: 2023,
  genre: ["Action", "Thriller"],
  director: "Prashanth Neel",
  actors: ["Prabhas", "Shruti Haasan"],
  language: "Telugu",
  country: "India",
  rating: 9.1,
  plot: "In the crime-infested Khansaar, Prince Varadha sets to ascend the throne. But a coup d'état is planned! And there is only one man to help reclaim power: Deva.",
  awards: "National Film Award",
  posterUrl: "https://example.com/salaar.jpg",
  trailerUrl: "https://example.com/salaar.mp4",
};



async function createMovie(newMovie) {
  try {
    const movie = new Movie(newMovie);
    const savedMovie = await movie.save();
    console.log("Movie saved successfully:", savedMovie);
  } catch (error) {
    console.error("Error creating movie:", error);
  }
}

createMovie(newMovie);