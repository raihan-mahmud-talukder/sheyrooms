import { useEffect, useState } from "react"
import axios from 'axios'
import { Room } from "../components/Room"
import { Loader } from "../components/Loader"
import { Error } from "../components/Error"
import moment from 'moment'
import 'antd/dist/reset.css'
import { DatePicker, Space } from 'antd'
const { RangePicker } = DatePicker

export const HomeScreen = () => {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [checkIn, setCheckIn] = useState()
    const [checkOut, setCheckOut] = useState()
    const [duplicateRooms, setDuplicateRooms] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = (await axios.get('/api/rooms/getallrooms')).data
                setRooms(data)
                setDuplicateRooms(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filterByDate = dates => {
        setCheckIn(dates[0].format('DD-MM-YYYY'))
        setCheckOut(dates[1].format('DD-MM-YYYY'))

        let temp = []
        for (const room of duplicateRooms) {
            let availability = false
            if (room.currentBookings.length > 0) {
                for (const booking of room.currentBookings) {
                    if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(
                        booking.checkIn, booking.checkOut) &&
                        !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(
                            booking.checkIn, booking.checkOut)
                        
                    ) {
                        if (
                            dates[0].format('DD-MM-YYYY') !== booking.checkIn &&
                            dates[0].format('DD-MM-YYYY') !== booking.checkOut &&
                            dates[1].format('DD-MM-YYYY') !== booking.checkIn &&
                            dates[1].format('DD-MM-YYYY') !== booking.checkOut
                        ) { availability = true }
                    }
                }
            } else { availability = true }
            if (availability === true) {
                temp.push(room)
            }
        }
        setRooms(temp)
        console.log(temp)
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? <Loader /> : rooms.length > 1 ? (rooms.map(room => {
                    return <div className="col-md-9 mt-2"><Room room={room} checkin={checkIn} checkout={checkOut} /></div>
                })) : <Error />}
            </div>
        </div>
    )
}