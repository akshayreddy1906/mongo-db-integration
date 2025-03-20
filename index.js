const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
// const fs = require("fs");
const Movie = require("./models/movie.models");
const { get } = require("mongoose");

app.use(express.json());
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

app.post("/movies", async (req, res) => {
  try {
    const savedMovie = await createMovie(req.body);
    res
      .status(201)
      .json({ message: "Movie added successfully", movie: savedMovie });
  } catch (error) {
    res.status(500).json({ error: "Failed to add movie", error: error });
  }
});

app.get("/movies", async (req, res) => {
  try {
    const allMovies = await getMovies();
    res
      .status(200)
      .json({ message: "Movies fetched successfully.", movies: allMovies });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies", error: error });
  }
});
async function getMovies() {
  try {
    const movies = await Movie.find();
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

async function getMovieByDirectorName(directorName) {
  try {
    const movieByDirector = await Movie.find({ director: directorName });
    return movieByDirector;
  } catch (error) {
    console.error("Error fetching movie:", error);
  }
}

//getMovieByDirectorName("S. S. Rajamouli");

app.get("/movies/:directorName", async (req, res) => {
  try {
    const movieByDirector = await getMovieByDirectorName(req.params.directorName);
    res
      .status(200)
      .json({ message: "Movies fetched successfully.", movies: movieByDirector });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies", error: error });
  }
});
async function updateMovie(movieId, updatedMovieData) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      updatedMovieData,
      { new: true }
    );
    return updatedMovie;
  } catch (error) {
    console.error("Error updating movie:", error);
  }
}
//updateMovie("67c873e9e53debb3749178e3", { rating: 8.5 });

app.post("/movies/:movieId/update", async (req, res) => {
  try {
    const updatedMovie = await updateMovie(req.params.movieId, req.body);
    res
      .status(200)
      .json({ message: "Movie updated successfully.", movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ error: "Failed to update movie", error: error });
  }
});
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
///updateMovieDetails("Salaar", { rating: 9.5 });

async function deleteMovieById(movieId) {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    return deletedMovie;
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
}
//deleteMovieById("67c873e9e53debb3749178e3");
app.delete("/movies/:movieId/delete", async (req, res) => {
  query = req.params.movieId;
  try {
    const deletedMovie = await deleteMovieById(query);
    res
      .status(200)
      .json({ message: "Movie deleted successfully.", movie: deletedMovie });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete movie", error: error });
  }
});

async function deleteMovieByTitle(movieTitle) {
  try {
    const deletedMovie = await Movie.findOneAndDelete({ title: movieTitle });
    console.log("Movie deleted successfully:", deletedMovie);
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
}
//deleteMovieByTitle("Salaar");

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
