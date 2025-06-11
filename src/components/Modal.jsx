import "./styles/Modal.css";
const Modal = ({
  handleModalClose,
  runTime,
  poster_path = null,
  realeaseDate = 0,
  genre_ids = 0,
  overview = "",
}) => {

  const fetchGenres = async () => {
    
  }

  return (
    <div className="modal">
      <div className="modalContent">
       <div className="imgSection">
            <img src={`${poster_path !== null ? `https://image.tmdb.org/t/p/w500${poster_path}` : "../../public/noimage.png"}`}></img>
       </div>
       <div className="infoSection">
        <p>{runTime}</p>
        <p>{poster_path}</p>
        <p>{realeaseDate}</p>
        <p>{genre_ids}</p>
        <p>{overview}</p>
       </div>
       <button onClick={handleModalClose}></button>
      </div>
    </div>
  );
};

export default Modal;
