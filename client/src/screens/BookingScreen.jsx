import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../components/Loader"
import { Error } from "../components/Error"
import moment from "moment"

export const BookingScreen = () => {
    const { roomid, checkin, checkout } = useParams()
    const [room, setRoom] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [amount, setAmount] = useState()

    const checkIn = moment(checkin, 'DD-MM-YYYY')
    const checkOut = moment(checkout, 'DD-MM-YYYY')
    const days = moment.duration(checkOut.diff(checkIn)).asDays() + 1
    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = (await axios.post('/api/rooms/getroombyid', { roomid })).data
                setRoom(data)
                setAmount(data.rentPerNight * days)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const bookRoom = async () => {
        const bookingDetails = {
            room, checkIn, checkOut, amount, days, userId: user._id
        }
        try {
            const result = (await axios.post('/api/bookings/bookroom', bookingDetails)).data
        }
        catch (error) { console.log(error) }
    }

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
                            <p>Name: {user.name}</p>
                            <p>From Date: {checkin}</p>
                            <p>To Date: {checkout}</p>
                            <p>Max Count: {room.maxCount}</p>
                        </div>
                        <div>
                            <h4>Amount</h4><hr />
                            <p>Total Days: {days}</p>
                            <p>Rent Per Day: {room.rentPerNight}</p>
                            <p>Total Amount: {room.rentPerNight * days}</p>
                        </div>
                        <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button>
                    </div>
                </div>
            ) : <Error />}
        </div>
    )
}
