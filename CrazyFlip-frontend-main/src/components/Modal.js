import React from 'react';
import LinkImage from '../assets/Banner.png'; // Import your image
import { Modal, Button, Image } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const overlayStyle = {
  position: 'relative',
  width: '100%',
};

const linkStyle = {
  position: 'absolute',
  bottom: '0',
  left: '10',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  color: 'white',
  textAlign: 'center',
  padding: '16px',
};


function  MyVerticallyCenteredModal(props) {
  const { show, onHide, link } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=''
    >
      <Modal.Body style={{ padding: 0 }}>
        <button
          className='close-icon'
	  onClick = {onHide}
         
        >
          <FaTimes />
        </button>
        <div style={overlayStyle}>
          <img src={LinkImage} alt="Link" style={{ width: '100%' }} />
          <div style={linkStyle}>
            <a target='_blank' href={link}>
              {link}
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
