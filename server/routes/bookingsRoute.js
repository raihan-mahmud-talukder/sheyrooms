const express = require('express')
const router = express.Router()
const Booking = require('../models/booking')
const Room = require('../models/room')
const moment = require('moment')

router.post('/bookroom', async (req, res) => {
    const { room, checkIn, checkOut, amount, days, userId } = req.body
    try {
        const newBooking = new Booking({
            room: room.name, roomId: room._id, userId,
            checkIn: moment(checkIn).format('DD-MM-YYYY'),
            checkOut: moment(checkOut).format('DD-MM-YYYY'),
            amount, days, txnId: '1234'
        })
        const booking = await newBooking.save()
        const temp = await Room.findOne({ _id: room._id })
        temp.currentBookings.push({
            bookingId: booking._id, userId: userId,
            checkIn: moment(checkIn).format('DD-MM-YYYY'),
            checkOut: moment(checkOut).format('DD-MM-YYYY'),
            status: booking.status
        })
        await temp.save()

        res.send('Room booked successfully')
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error })
    }
})

module.exports = router