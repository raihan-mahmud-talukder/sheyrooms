import { Tabs } from "antd"
import { useEffect } from "react"
import axios from 'axios'
const {TabPane} = Tabs
const user = JSON.parse(localStorage.getItem('currentUser'))

export const ProfileScreen = () => {
    useEffect(() => {
        if (!user) {
            window.location.href='/login'
        }
    }, [])
  return (
    <div className="ms-3 mt-3">
        <Tabs defaultActiveKey="1">
            <TabPane tab='Profile' key='1'>
                <h3>My Profile</h3><br />
                <p><b>Name:</b> {user.name}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>isAdmin:</b> {user.isAdmin ? 'YES' : 'NO'}</p>
                </TabPane>
            <TabPane tab='Bookings' key='2'><MyBooking /></TabPane>
        </Tabs>
    </div>
  )
}

export const MyBooking = () => {
  useEffect(() => {
    const fetchData = async () => {
      const rooms = (await axios.post('/api/rooms/getbookingsbyuserid', { userId: user._id })).data
      console.log(rooms)
    }
    fetchData()
  })
  return (
    <div>
        <h3>My Bookings</h3>
    </div>
  )
}
