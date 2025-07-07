const express = require("express")
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");

const router = express.Router()

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        msg: "admin created successfully"
    })
});

router.post('/signin',  async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await Admin.findOne({
        username,
        password
    })
    if (user){
        const token = jwt.sign({
            username
        }, JWT_SECRET)

        res.json({token})
    }else {
        res.status(411).json({
            msg : "incorrect username and password"
        })
    }
    })
    // Implement admin signup logic;

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const imagelink = req.body.imagelink
    const price = req.body.price

    const newCourse = await Course.create({
        title,
        description,
        imagelink,
        price
    })

    res.json({
        msg: "course created successfully",courseId: newCourse
    })
    // Implement course creation logic
});

router.get('/courses', async (req, res) => {
    const response = await Course.find({})

    res.json({
        courses: response
    })
    // Implement fetching all courses logic
});

module.exports = router;