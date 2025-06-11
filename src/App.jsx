import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import Header from "./components/Header";

const App = () => {
  const ApiKey = import.meta.env.VITE_TMDB_API_KEY;
  const AccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const handleSearchMovies = () => {
    setSearchingMovies(true);
    fetchSearchMovies(searchQuery);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  };
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
   const fetchMovieDetails = async (id, setGenres, setRunTime) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${AccessToken}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed the fetch");
      }
      const data = await response.json();
      setGenres(data.genres);
      setRunTime(data.runtime)
    } catch (e) {
      console.error(e);
    }
  };


  const [searchQuery, setSearchQuery] = useState("");
  const [searchingMovies, setSearchingMovies] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [moviePage, setMoviePage] = useState(1);



  return (
    <div className="App">
      <Header
      handleSearchChange={handleSearchChange}
      searchQuery={searchQuery}
      />

      <MovieList
        searchQuery={searchQuery}
        fetchDataCurrPlaying={fetchDataCurrPlaying}
        fetchSearchMovies={fetchSearchMovies}
        fetchPageMovie={fetchPageMovie}
        searchingMovies={searchingMovies}
        setSearchingMovies={setSearchingMovies}
        handleSearchMovies={handleSearchMovies}
        movieData={movieData}
        setMovieData={setMovieData}
        moviePage={moviePage}
        setMoviePage={setMoviePage}
        fetchMovieDetails={fetchMovieDetails}
      />
      <Footer />
    </div>
  );
};

export default App;
