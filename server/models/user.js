const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required},
    isAdmin: {type: Boolean, default: false}
}, {timestamps: true})

const userModel = mongoose.Model('users', userSchema)

module.export = userModel