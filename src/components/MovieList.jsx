import { useState, useEffect } from "react";

import MovieCard from "./MovieCard.jsx";
import Modal from "./Modal.jsx";
import "./styles/MovieList.css";
import Data from "../data/data.js";
import RenderMovies from './RenderMovies.jsx'

const MovieList = ({
  Sort,
  sort,
  searchQuery,
  fetchDataCurrPlaying,
  fetchSearchMovies,
  fetchPageMovie,
  searchingMovies,
  setSearchingMovies,
  handleSearchMovies,
  movieData,
  setMovieData,
  setMoviePage,
  moviePage,
  fetchMovieDetails,
}) => {
  const [isModalActive, setisModalActive] = useState(false);
  const [ModalValues, setModalValues] = useState({});

  const handleModalOpen = (movie) => {
    setModalValues(movie);
    setisModalActive(true);
  };
  const handleModalClose = () => {
    setisModalActive(false);
  };
  const LoadMore = async () => {
    setMoviePage((moviePage) => moviePage + 1);
    const count = moviePage + 1;
    let newData = {};
    newData = await fetchPageMovie(count);
    setMovieData((movieData) => Sort(sort, [...movieData, ...newData.results]));
  };

  useEffect(() => {
    fetchDataCurrPlaying();
  }, []);
  useEffect(() => {
    if (!searchingMovies) {
      console.log("rendered Current");
      fetchDataCurrPlaying(sort);
    } else {
      console.log("rendered search");
      fetchSearchMovies(searchQuery);
    }
  }, [searchingMovies, sort]);

  
  const handleCurrentlyPlaying = () => {
    setMoviePage(1);
    setSearchingMovies(false);
  };

  return (
    <div className="MovieList">
      <h1>Movie List</h1>
      <div>
        <button onClick={handleSearchMovies}>Search</button>
        <button onClick={handleCurrentlyPlaying}>Currently Playing</button>
      </div>
      <div className="List">
        <RenderMovies movieData={movieData} searchingMovies={searchingMovies} />{" "}
        {isModalActive ? (
          <Modal
            handleModalClose={handleModalClose}
            {...ModalValues}
            fetchMovieDetails={fetchMovieDetails}
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        <button onClick={LoadMore}>Load More</button>
      </div>
    </div>
  );
};

export default MovieList;
