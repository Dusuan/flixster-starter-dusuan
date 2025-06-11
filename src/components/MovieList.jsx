import { useState, useEffect } from "react";

import MovieCard from "./MovieCard.jsx";
import Modal from "./Modal.jsx"
import "./styles/MovieList.css";
import Data from "../data/data.js";

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const [moviePage, setMoviePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchingMovies, setSearchingMovies] = useState(false);
  const [isModalActive, setisModalActive] = useState(false)
  const [ModalValues, setModalValues] = useState({})

  const ApiKey = import.meta.env.VITE_TMDB_API_KEY;
  const AccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  const fetchDataCurrPlaying = async () => {
    setMovieData(() => []);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${AccessToken}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${moviePage}&api_key=${ApiKey}`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed the fetch");
      }
      const data = await response.json();
      setMovieData(data.results);
    } catch (e) {
      console.error(e);
    }
  };
  const fetchSearchMovies = async (query) => {
    setMovieData([]);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${AccessToken}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed the fetch");
      }
      const data = await response.json();
      setMovieData(data.results);
    } catch (e) {
      console.error(e);
    }
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  };
  const handleModalOpen = (movie) => {
    setModalValues(movie)
    setisModalActive(true)
  }
  const handleModalClose = () => {
    setisModalActive(false)
  }
  const LoadMore = async () => {
    setMoviePage((moviePage) => moviePage + 1);
    const count = moviePage + 1;
    const newData = await fetchPageMovie(count);

    setMovieData((movieData) => [...movieData, ...newData.results]);
  };
  const fetchPageMovie = async (page) => {
    let data;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${AccessToken}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}&api_key=${ApiKey}`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed the fetch");
      }
      data = await response.json();
    } catch (e) {
      console.error(e);
    }
    return data;
  };

  useEffect(() => {
    fetchDataCurrPlaying();
  }, []);

  useEffect(() => {
    if (!searchingMovies) {
      console.log("rendered Current");
      fetchDataCurrPlaying();
    } else {
      console.log("rendered search");
      fetchSearchMovies(searchQuery);
    }
    renderMovies();
  }, [searchingMovies]);

  const renderMovies = () => {
    if (searchingMovies && movieData.length < 1) {
      return <div>No movies found!</div>;
    }
    if (!movieData) {
      return <div>Something went wrong</div>;
    } else {
      return movieData?.map((movie) => (
        <div key={movie.id} onClick={() => handleModalOpen(movie)}>
          <MovieCard
            imgURL={movie.poster_path}
            movieTitle={movie.title}
            rating={movie.vote_average}
          />
        </div>
      ));
    }
  };

  const handleSearchMovies = () => {
    setSearchingMovies(true);
    fetchSearchMovies(searchQuery);
  };

  const handleCurrentlyPlaying = () => {
    setMoviePage(1);
    setSearchingMovies(false);
  };
  return (
    <div className="MovieList">
      <h1>Movie List</h1>
      <input
        type="text"
        placeholder={"Search for a movie!"}
        value={searchQuery}
        onChange={handleSearchChange}
      ></input>
      <div>
        <button onClick={handleSearchMovies}>Search</button>
        <button onClick={handleCurrentlyPlaying}>Currently Playing</button>
      </div>
      <div className="List">{renderMovies()}  {isModalActive ? <Modal handleModalClose={handleModalClose}{...ModalValues}/> : <></>}</div>
      <div>
        <button onClick={LoadMore}>Load More</button>
      </div>
    </div>
  );
};

export default MovieList;
