import React from "react";
import "./modalstyle.css"
const Modal = ({ message, type, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className={`modal-content ${type}`}>
          <p>{message}</p>
        </div>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
