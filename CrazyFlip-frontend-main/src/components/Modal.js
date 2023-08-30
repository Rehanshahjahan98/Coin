import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
  const { link, show, onHide } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=''
    >
      <Modal.Header closeButton>
        <Modal.Title className='m-auto' style={{ letterSpacing: "1px" }} id="contained-modal-title-vcenter">
          Below is your generated link
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <a target='_' href="">{link}</a>
      </Modal.Body>
      <Modal.Footer>
        <Button className='bg-warning' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal
