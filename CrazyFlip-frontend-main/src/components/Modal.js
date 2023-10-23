import React from 'react';
import LinkImage from '../assets/Link.png'; // Import your image
import { Modal, Button, Image } from 'react-bootstrap';

const overlayStyle = {
  position: 'relative',
  width: '100%',
};

const linkStyle = {
  position: 'absolute',
  bottom: '0',
  left: '10',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  textAlign: 'center',
  padding: '2px',
};


function MyVerticallyCenteredModal(props){
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
