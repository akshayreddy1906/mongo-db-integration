const mangoose = require("mongoose");
const movieSchema = new mangoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    genre: [
      {
        type: String,
        enum: [
          "Action",
          "Drama",
          "Sci-Fi",
          "Romance",
          "Comedy",
          "Thriller",
          "Horror",
          "Fantasy",
          "Sports",
          "Musical",
          "Other",
        ],
      },
    ],
    director: {
      type: String,
      required: true,
    },
    actors: [
      {
        type: String,
      },
    ],
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    plot: {
      type: String,
    },
    posterUrl: {
      type: String,
    },
    trailerUrl: {
      type: String,
    },
  },
  { timestamps: true }
);
const Movie = mangoose.model("Movie", movieSchema);
module.exports = Movie;
