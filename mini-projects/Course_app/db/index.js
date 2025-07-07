const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("Your mongodb url");

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
    // Schema definition here
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
    // Schema definition here
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imagelink: String,
    price: Number
    // Schema definition here
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}
