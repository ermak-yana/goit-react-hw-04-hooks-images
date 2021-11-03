import PropTypes from "prop-types";
import { useEffect } from "react";
import css from "../Modal/Modal.module.css";
import { createPortal } from "react-dom";

function Modal({ onClose, largeImageURL }) {
  useEffect(() => {
    window.addEventListener("keydown", onClickEscClose);
    return () => {
      window.removeEventListener("keydown", onClickEscClose);
    };
  });

  const onClickEscClose = (event) => {
    if (event.code === "Escape") {
      onClose();
    }
  };

  const onClickOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={onClickOverlayClose}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="img" />
      </div>
    </div>,
    document.getElementById("portal")
  );
}

Modal.propTypes = {
  // largeImageURL: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
