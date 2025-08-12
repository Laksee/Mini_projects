
const { Router } = require("express")
const router = Router()
const {User,Account} = require("../db")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config")
const zod = require("zod")
const {z} = require("zod")
const {authMiddlewares} = require("../middlware/authMiddlware")

const signupSchema = zod.object({
    email: z.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

router.post("/signup",async function(req,res){
    const body = req.body
    const result = signupSchema.safeParse(req.body)
    if (!result.success){
        console.log(result.error.format())
        return res.status(404).json({
            msg: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        email: body.email
    })

    if(existingUser){
        return res.status(400).json({
            msg: "User already exists"
        })
    }

    const user = await User.create({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })
    const userId = user._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET)
    res.json({
        msg: "User created successfully",
        token: token
    })
})

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async function(req,res){
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.status(404).json({
            msg: "Invalid Credentials"
        })
    }

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET)

        res.json({
            token:token
        })
        return
    }else {
        res.status(404).json({
            msg: "Error while loging in"
        })
    }

    res.json({
        msg: "logged in successfully"
    })
})


const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})

router.put("/",authMiddlewares, async (req,res) => {
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            msg: "Failed to update the information"
        })
    }

    await User.updateOne(
        {_id: req.userId},
        {$set: req.body}
    )

    res.json({
        msg: "Updated successfully"
    })
})

router.get("/bulk", async (req,res) =>{
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [
            { firstname: { $regex: filter, $options: "i" } },
            { lastname: { $regex: filter, $options: "i" } }
        ]
    });

    res.json({
        user:users.map(user => ({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})


router.get("/getini", authMiddlewares, async (req, res) => {
    const user = await User.findOne({ _id: req.userId });
    if (!user) return res.status(403).json({ error: "User not found" });

    return res.json({
        firstname: user.firstname,
        lastname: user.lastname
    });
});



module.exports = router