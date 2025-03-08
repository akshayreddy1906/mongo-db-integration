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

// createMovie(newMovie);

async function getMovies() {
  try {
    const movies = await Movie.find();
    console.log("Movies:", movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}
// getMovies();

async function getMovieByDirectorName(directorName) {
  try {
    const movieByDirector = await Movie.find({ director: directorName });
    console.log("Movie:", movieByDirector);
  } catch (error) {
    console.error("Error fetching movie:", error);
  }
}

//getMovieByDirectorName("S. S. Rajamouli");

async function updateMovie(movieId, updatedMovieData) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      updatedMovieData,
      { new: true }
    );
    console.log("Movie updated successfully:", updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
  }
}
//updateMovie("67c873e9e53debb3749178e3", { rating: 8.5 });

async function updateMovieDetails(movieTitle, updatedMovieData) {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { title: movieTitle },
      updatedMovieData,
      { new: true }
    );
    console.log("Movie updated successfully:", updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
  }
}
updateMovieDetails("Salaar", { rating: 9.5 });