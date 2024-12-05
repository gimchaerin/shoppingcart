import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, onConfirm, message, theme }) {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${theme}`}>
      <div className={`modal-container ${theme}`}>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-button confirm" onClick={onConfirm}>
            확인
          </button>
          <button className="modal-button cancel" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;