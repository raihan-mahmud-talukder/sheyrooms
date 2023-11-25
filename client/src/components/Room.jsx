export const Room = ({ room }) => {
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
                    <button className="btn btn-primary">View Details</button>
                </div>
            </div>
        </div >
    )
}
