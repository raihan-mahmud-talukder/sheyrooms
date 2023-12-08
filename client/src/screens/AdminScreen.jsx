import { Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import { useEffect, useState } from "react"
import axios from 'axios'
import { Loader } from "../components/Loader"

export const AdminScreen = () => {
    return (
        <div>
            <h1>Admin Panel</h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab='Bookings' key='1'><Bookings /></TabPane>
                <TabPane tab='Rooms' key='2'><h3>Rooms</h3></TabPane>
                <TabPane tab='Users' key='3'><h3>Users</h3></TabPane>
                <TabPane tab='Add Room' key='4'><h3>Add Room</h3></TabPane>
            </Tabs>
        </div>
    )
}
const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get('/api/bookings/getallbookings')).data
                setBookings(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(error)
            }
        }
        fetchData()
    }, [])
    return (
        <div className="row">
            <div className="col-md-10">
                <h3>Bookings</h3>
                {loading && <Loader />}
                {bookings.length && <h5>There are total {bookings.length} bookings</h5>}
            </div>
        </div>
    )
}
