
const { Router } = require("express")
const { authMiddlewares } = require("../middlware/authMiddlware")
const router = Router()
const {default: mongoose} = require("mongoose")
const { Account } = require("../db")


router.get("/balance",authMiddlewares, async (req ,res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddlewares , async (req,res)=> {
    const session = await mongoose.startSession()

    session.startTransaction()
    const {amount, to} = req.body

    const account = await Account.findOne({
        userId: req.userId
    }).session(session)

    if(!account || account.balance<amount){
        await session.abortTransaction()
        return res.json({
            msg: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session)

    if(!toAccount) {
        await session.abortTransaction()
        return res.status(404).json({
            msg: "Invalid Account"
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc:{balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: +amount}}).session(session)

    await session.commitTransaction()
    res.json({
        msg: "Transfer Successsful"
    })
})

module.exports = router
