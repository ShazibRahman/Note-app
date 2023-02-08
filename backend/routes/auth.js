const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')


const JWT_SECRET = process.env.JWT_SECRET || "WaaduHekIsThis$me@qqw"


//creating a user using: POST "/api/auth/". Doesnt require auth

router.post("/createuser", [
    body('name', 'name cant be less than 3 letter',).isLength({ min: 3 }),
    body('email', 'please provide a valid email').isEmail(),
    body('password', 'please use smallCase upperCase number and a special character combination').isStrongPassword()

],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        let user;
        try {
            const salt = await bcyrpt.genSalt()
            const secPass = await bcyrpt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });

            const data = {
                user: {
                    id: user._id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            res.status(200).send({ authToken })
            console.log(user);

        } catch (error) {
            if (error.message.includes('duplicate')) return res.status(400).send({ message: `User with the email ${req.body.email} already exist` })
            res.status(500).send({ message: error.message })

        }


    });

//authenticate a user Using: POST "/api/auth/login". No login required
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be empty').exists()
],
    async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
        const { email, password } = req.body
        try {

            let user = await User.findOne({ email })
            if (!user) return res.status(400).json({ message: "please try to login with correct credential" })

            const passwordCompare = await bcyrpt.compare(password, user.password)
            if (!passwordCompare) return res.status(400).json({ message: "please try to login with correct credential" })


            const data = {
                user: {
                    id: user._id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            return res.json({ authToken })
        } catch (error) {
            return res.status(400).json({ message: "please try to login with correct credential" })

        }
    })

// get logged in user detail : POST /api/auth/getuser : login required

router.post("/getuser", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {

    }
})


module.exports = router