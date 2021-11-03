import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import getImages from "./servise/getImages.js";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

function App() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [isShow, setIsShow] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  const onChangeState = (value) => {
    setValue(value);
    setPage(1);
    setGallery([]);
  };

  useEffect(() => {
    if (value === "") {
      return;
    }
    getApiImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, page]);

  const getApiImages = () => {
    setIsLoading(true);
    getImages(value, page)
      .then((hits) => {
        if (hits.length === 0) {
          toastError();
        }
        setGallery((prevState) => [...prevState, ...hits]);
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch()
      .finally(() => setIsLoading({ isLoading: false }));
  };

  const onClickImgOpen = () => {
    setIsShow(!isShow);
  };

  const loadMore = (e) => {
    e.preventDefault();
    setPage((prevState) => prevState + 1);
  };

  const changeSrc = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
  };

  const toastError = () => {
    toast.error("Nothing found for your request", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onChangeState}></Searchbar>
      <ImageGallery
        gallery={gallery}
        onClickImgOpen={onClickImgOpen}
        changeSrc={changeSrc}
      />
      {isLoading && <Loader />}
      {gallery.length > 0 ? <Button onClick={loadMore} /> : null}
      {isShow && (
        <Modal onClose={onClickImgOpen} largeImageURL={largeImageURL} />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
