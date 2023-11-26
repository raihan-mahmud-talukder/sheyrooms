import { useEffect, useState } from "react"
import axios from 'axios'
import { Room } from "../components/Room"
import { Loader } from "../components/Loader"
import { Error } from "../components/Error"

export const HomeScreen = () => {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = (await axios.get('/api/rooms/getallrooms')).data
                setRooms(data)
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
        <div className="row justify-content-center mt-5">
            {loading ? <Loader /> : rooms.length > 1 ? (rooms.map(room => {
                return <div className="col-md-9 mt-2"><Room room = {room} /></div>
            })) : <Error />}
        </div>
    )
}