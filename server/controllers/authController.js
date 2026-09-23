const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Invalid Input"
        })
    }

    const existingUser = await User.findOne({ email: email })

    if (!existingUser) {
        return res.status(400).json({
            message: "Email is not registered, Please register"
        })
    }

    const checkPassword = await bcrypt.compare(
        String(password),
        String(existingUser.password)
    )

    if (!checkPassword) {
        return res.status(400).json({
            message: "Wrong Password"
        })
    }

    const token = jwt.sign(
        { id: existingUser._id },
        process.env.SECRET_KEY
    )

    res.status(200).json({
        message: "Login Successfully",
        token: token
    })
}

async function register(req, res) {

    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            message: "Invalid Input"
        })
    }

    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        })
    }

    const encryptPassword = await bcrypt.hash(String(password), 4)

    const newuser = await User.create({
        name: name,
        email: email,
        password: encryptPassword,
        role: role
    })

    res.status(201).json({
        message: "User registered successfully"
    })
}

module.exports = {
    login,
    register
}