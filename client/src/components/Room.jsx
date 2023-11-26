import { useState } from "react";
import { Modal, Button, Carousel } from 'react-bootstrap'
import { Link } from "react-router-dom";
export const Room = ({ room }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="row room">
            <div className="col-md-4">
                <img src={room.imageUrls[0]} alt={room.name} className="smallimg" />
            </div>
            <div className="col-md-7">
                <h3>{room.name}</h3>
                <p>Max Count: {room.maxCount}</p>
                <p>Phone: {room.phoneNumber}</p>
                <p>Type: {room.type}</p>
                <div style={{ float: 'right' }}>
                <Link to={`/book/${room._id}`}><button className="btn btn-primary">Book now</button></Link>
                    <button className="btn btn-primary ms-2" onClick={handleShow}>View Details</button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imageUrls.map(url => {
                            return (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 bigimg"
                                        src={url}
                                        alt={room.name}
                                    />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                    <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
