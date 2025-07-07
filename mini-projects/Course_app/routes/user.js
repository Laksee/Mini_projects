const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    await User.create({
        username: username,
        password: password
    })
    res.json({
        msg: "user created succesfully"
    })
    // Implement user signup logic
});

router.get('/courses', async (req, res) => {
    const response = await Course.find({}) 
    res.json({
        msg: "All the courses" , response
    })
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId
    const username = req.headers.username
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

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const user = await User.findOne({username: req.headers.username})
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

module.exports = router