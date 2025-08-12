const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://lakshaychandel606:CZWFcdnmhtSSeDGV@cluster0.ci5t1s4.mongodb.net/Paytm")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
})




const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true},
    balance: {
        type: Number,
        required: true
    }
})


const User = mongoose.model("User",UserSchema)
const Account = mongoose.model("Account",accountSchema)

module.exports = {
    User,
    Account
}