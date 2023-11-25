import { useEffect, useState } from "react"
import axios from 'axios'

export const HomeScreen = () => {
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get('/api/rooms/getallrooms')).data
                setRooms(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <h1>Home Screen</h1>
            <h4>There are {rooms.length} rooms</h4>
        </>
    )
}