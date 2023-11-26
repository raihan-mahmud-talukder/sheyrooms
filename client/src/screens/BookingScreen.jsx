import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../components/Loader"
import { Error } from "../components/Error"

export const BookingScreen = () => {
    const { roomid } = useParams('')
    const [room, setRoom] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = (await axios.post('/api/rooms/getroombyid', { roomid })).data
                setRoom(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return (
        <div className="cart mt-5">
            {loading ? <Loader /> : room ? (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h3>{room.name}</h3>
                        <img src={room.imageUrls[0]} alt={room.name} className="bigimg" />
                    </div>
                    <div className="col-md-6">
                        <div>
                            <h4>Booking Details</h4><hr />
                            <p>Name: </p>
                            <p>From Date:</p>
                            <p>To Date:</p>
                            <p>Max Count: {room.maxCount}</p>
                        </div>
                        <div>
                            <h4>Amount</h4><hr />
                            <p>Total Days:</p>
                            <p>Rent Per Day: {room.rentPerNight}</p>
                            <p>Total Amount: </p>
                        </div>
                        <button className="btn btn-primary">Pay Now</button>
                    </div>
                </div>
            ) : <Error />}
        </div>
    )
}