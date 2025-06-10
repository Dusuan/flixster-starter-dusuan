import { useState, useEffect } from "react";

import MovieCard from "./MovieCard.jsx";
import "./styles/MovieList.css";
import Data from "../data/data.js";

const MovieList = () => {
  const [movieData, setMovieData] = useState(null);
  const AccessToken = import.meta.env.TMBD_ACCESS_TOKEN;

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${AccessToken}`,
      },
    };
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        options
      );
      if (!response.ok) {
        throw new Error("Failed the fetch");
      }
      const data = await response.json();
      setMovieData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const LoadMore = () => {

    
    };

  useEffect(() => {
    fetchData();
  }, []);



  const Movies = () => {
    if(!movieData){
      return <div>Loading...</div>
    }
    else{
    const ResultsPageOne = movieData.results;
    return ResultsPageOne?.map((movie) => (
      <div key={movie.id}>
        <MovieCard
          imgURL={movie.poster_path}
          movieTitle={movie.title}
          rating={movie.vote_average}
        />
      </div>
    ));
  }};

  return (
    <div className="MovieList">
      <h1>Movie List</h1>
      <div className="List">{Movies()}</div>
      <div>
        <button onClick={LoadMore}>Load More</button>
      </div>
    </div>
  );
};

export default MovieList;
