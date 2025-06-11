import "./styles/Modal.css";
import { useEffect, useState } from "react";
const Modal = ({
  handleModalClose,
  runTime,
  original_title,
  poster_path = null,
  release_date = 0,
  id = 0,
  overview = "",
}) => {
  const AccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  const [genres, setGenres] = useState([]);
  const [videoKey, setVideoKey] = useState("");

  const fetchGenres = async (id) => {
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
    } catch (e) {
      console.error(e);
    }
  };

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
      setVideoKey(data.results[0].key);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchGenres(id);
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
              src={`${
                poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : "../../public/noimage.png"
              }`}
            ></img>
            {videoKey !== "" ? 
              <iframe
                width={"420"}
                height={"315"}
                src={`https://www.youtube.com/embed/${videoKey}`}
              ></iframe> : <p> No trailer found </p>
            }
          </div>
          <div className="infoSection">
            <p>{runTime}</p>
            <p>{release_date}</p>
            <p>{overview}</p>
            <div>
              <p> Genres :</p>
              {genres.map((genre) => {
                return <p key={genre.id}>{genre.name}</p>;
              })}
            </div>
          </div>
        </div>
        <button onClick={handleModalClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
