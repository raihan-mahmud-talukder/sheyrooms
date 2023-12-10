import { Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import { useEffect, useState } from "react"
import axios from 'axios'
import { Loader } from "../components/Loader"

export const AdminScreen = () => {
    const admin = JSON.parse(localStorage.getItem('currentUser')).isAdmin
    useEffect(() => {
        if (!admin) {
            window.location.href = '/home'
        }
    }, [])
    return (
        <div>
            <h1>Admin Panel</h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab='Bookings' key='1'><Bookings /></TabPane>
                <TabPane tab='Rooms' key='2'><Rooms /></TabPane>
                <TabPane tab='Users' key='3'><Users /></TabPane>
                <TabPane tab='Add Room' key='4'><AddRoom /></TabPane>
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
            <div className="col-md-12">
                <h3>Bookings</h3>
                {loading && <Loader />}
                {bookings.length && <h6>There are total {bookings.length} bookings</h6>}
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && bookings.map(booking => {
                            return (
                                <tr key={booking._id}>
                                    <td>{booking._id}</td>
                                    <td>{booking.userId}</td>
                                    <td>{booking.room}</td>
                                    <td>{booking.checkIn}</td>
                                    <td>{booking.checkOut}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const Rooms = () => {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get('/api/rooms/getallrooms')).data
                setRooms(data)
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
            <div className="col-md-12">
                <h3>Rooms</h3>
                {loading && <Loader />}
                {rooms.length && <h6>There are total {rooms.length} bookings</h6>}
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent</th>
                            <th>Capacity</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && rooms.map(room => {
                            return (
                                <tr key={room._id}>
                                    <td>{room._id}</td>
                                    <td>{room.name}</td>
                                    <td>{room.type}</td>
                                    <td>{room.rentPerNight}</td>
                                    <td>{room.maxCount}</td>
                                    <td>{room.phoneNumber}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get('/api/users/getallusers')).data
                setUsers(data)
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
            <div className="col-md-12">
                <h3>Users</h3>
                {loading && <Loader />}
                {users.length && <h6>There are total {users.length} users</h6>}
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length && users.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const AddRoom = () => {
    const [name, setName] = useState()
    const [rent, setRent] = useState()
    const [count, setCount] = useState()
    const [decription, setDescription] = useState()
    const [phone, setPhone] = useState()
    const [type, setType] = useState()
    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()

    const addRoom = async () => {
        const newRoom = {
            name, rent, count, decription, phone, type, image: [img1, img2, img3]
        }
        try {
            const result = (await axios.post('/api/rooms/addroom', newRoom)).data
            console.log(result)
        } catch (error) { console.log(error) }
    }
    return (
        <div className="row">
            <h3>Add Room</h3>
            <div className="col-md-5">
                <input
                    type="text"
                    className="form-control"
                    placeholder="room name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <input
                    type="number"
                    className="form-control"
                    placeholder="rent per night"
                    value={rent}
                    onChange={event => setRent(event.target.value)}
                />
                <input
                    type="number"
                    className="form-control"
                    placeholder="max count"
                    value={count}
                    onChange={event => setCount(event.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    value={decription}
                    onChange={event => setDescription(event.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="phone number"
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                />
            </div>
            <div className="col-md-5">
                <input
                    type="text"
                    className="form-control"
                    placeholder="room type"
                    value={type}
                    onChange={event => setType(event.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Image URL 1"
                    value={img1}
                    onChange={event => setImg1(event.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Image URL 2"
                    value={img2}
                    onChange={event => setImg2(event.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Image URL 3"
                    value={img3}
                    onChange={event => setImg3(event.target.value)}
                />
                <button className="btn btn-primary add-room" onClick={addRoom}>Add Room</button>
            </div>
        </div>
    )
}