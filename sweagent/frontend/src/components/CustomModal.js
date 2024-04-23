import React from 'react';
import Modal from 'react-modal';

// Make sure to set the appElement for accessibility
Modal.setAppElement('#root');

const CustomModal = ({ content, isOpen, onClose, onConfirm, customClass, customStyles }) => {
  const defaultStyles = {
    overlay: {
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
    },
    content: {
      alignItems: 'center',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      height: '50%',
      inset: 'auto',
      justifyContent: 'center',
      left: '50%',
      position: 'absolute',
      top: '50%',
      width: '50%',
    },
  };

  const cancelButton = {
    backgroundColor: '#eee',
    color: 'black',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    marginLeft: '10px',
    cursor: 'pointer',
  }

  const okButton = {
    backgroundColor: '#eee',
    color: 'black',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  const mergedStyles = {
    ...defaultStyles,
    content: {
      ...defaultStyles.content,
      ...customStyles?.content, // Merge with custom content styles if provided
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`${customClass || ''}`}
      contentLabel="Custom Modal"
      style={mergedStyles}
    >
      <div style={{ width: '100%', flexGrow: '1', height: '100%', overflowY: 'auto' }}>
        {content}
      </div>
      <div>
        {!!onConfirm && <button onClick={onConfirm} style={okButton}>OK</button>}
        {!!onClose && <button onClick={onClose} style={cancelButton}>Cancel</button>}
      </div>
    </Modal>
  );
};

export default CustomModal;