import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

// Use the spread operator to add like and seen, then just iterate trough them to display and accessing the object data trough the id when liking and saving in seen

const App = () => {
  const newInfo = {
    isLiked: false,
    isWatched: false,
  };
  const ApiKey = import.meta.env.VITE_TMDB_API_KEY;
  const AccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${AccessToken}`,
    },
  };
  const handleSearchMovies = () => {
    setSearchingMovies(true);
    fetchSearchMovies(searchQuery);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  };
  const fetchDataCurrPlaying = async (sort) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${moviePage}&api_key=${ApiKey}`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed the fetch");
      }
      const data = await response.json();
      let results = data.results;
      results = Sort(sort, results);
      console.log(results);

      results = results.map((movie) => ({ ...movie, ...newInfo }));

      console.log(results);

      setMovieData(results);
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
      setRunTime(data.runtime);
    } catch (e) {
      console.error(e);
    }
  };

  const Sort = (filter, results) => {
    if (filter === "byName") {
      const filteredData = results.sort((a, b) => {
        const x = a.title.toLowerCase();
        const y = b.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      return filteredData;
    } else if (filter === "byReleaseDateDesc") {
      const filteredData = results.sort((a, b) => {
        const x = Date.parse(a.release_date);
        const y = Date.parse(b.release_date);
        return x - y;
      });
      return filteredData;
    } else if (filter === "byVoteAvgDesc") {
      const filteredData = results.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
      return filteredData;
    } else return results;
  };
  const handleCurrentlyPlaying = () => {
    fetchDataCurrPlaying();
    setMoviePage(1);
    setSearchingMovies(false);
    setSearchQuery("")
  };

  
  const [sort, setSort] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchingMovies, setSearchingMovies] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [moviePage, setMoviePage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="App">
      <Header
        handleCurrentlyPlaying={handleCurrentlyPlaying}
        handleSearchMovies={handleSearchMovies}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
        sort={sort}
        setSort={setSort}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      {showSidebar ? (
        <SideBar
          handleCurrentlyPlaying={handleCurrentlyPlaying}
          setShowSidebar={setShowSidebar}
          setMovieData={setMovieData}
          movieData={movieData}
          fetchDataCurrPlaying={fetchDataCurrPlaying}
        />
      ) : (
        <></>
      )}
      <MovieList
        Sort={Sort}
        sort={sort}
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
