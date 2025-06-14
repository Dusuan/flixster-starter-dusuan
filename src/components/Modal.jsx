import "./styles/Modal.css";
import { useEffect, useState } from "react";
const Modal = ({
  handleModalClose,
  original_title,
  poster_path = null,
  release_date = 0,
  id = 0,
  overview = "",
  fetchMovieDetails,
}) => {
  const AccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  const [videoKey, setVideoKey] = useState("");
  const [genres, setGenres] = useState([]);
  const [runTime, setRunTime] = useState(0);

  const fetchVideo = async (id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${AccessToken}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed the fetch");
      }
      const data = await response.json();

      const filteredData = data.results.filter((videos) => {
        return (videos.official = true && videos.type === "Trailer");
      });

      setVideoKey(filteredData[0].key);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMovieDetails(id, setGenres, setRunTime);
    fetchVideo(id);
  }, []);

  return (
    <div className="modal">
      <div className="modalContent">
        <div>
          <h1>{original_title}</h1>
        </div>
        <div className="modalTextImageSection">
          <div className="imgSection">
            <img
              alt={`Poster for: ${original_title}`}
              src={`${
                poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : "../../noimage.png"
              }`}
            ></img>
            {videoKey !== "" ? (
              <iframe
                className="Iframe"
                width={"800"}
                height={"448"}
                src={`https://www.youtube.com/embed/${videoKey}`}
              ></iframe>
            ) : (
              <p className="noTrailer"> No trailer found </p>
            )}
          </div>
          <div className="infoSection">
            <div>
              <p>Duration : {runTime} minutes</p>
              <p>Release date : {release_date}</p>
            </div>
            <div>
              <p>{overview}</p>
            </div>
            <div>
              <p>
                <strong> Genres :</strong>
              </p>
              <div className="genreContainer">
                {genres.map((genre) => {
                  return (
                    <p className="Genre" key={genre.id}>
                      {genre.name}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleModalClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
