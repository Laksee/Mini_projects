const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/user");
const { Admin, User, Course } = require("../db/index");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken")

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    await User.create({
        username: username,
        password: password
    })

    res.json({
        msg: "User created successfully"
    })
    // Implement user signup logic
});

router.post('/signin', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({
        username,
        password
})

    if (user){
        const token = jwt.sign({username},JWT_SECRET)

        res.json({token})
    }else{
        res.status(404).json({
            msg:"user does not exist"
        })
    }
    // Implement admin signup logic
});

router.get('/courses', async (req, res) => {
    const courses = await Course.find({})

    res.json({
        msg: courses
    })
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId
    const username = req.username
        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCourses: courseId
            }
        })
        res.json({
            msg: "Purchased complete!"
        })
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.findOne({username: req.username})
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })
    res.json({
        msg: "purchased courses are", courses
    })
    // Implement fetching purchased courses logic
});

module.exports = router; 