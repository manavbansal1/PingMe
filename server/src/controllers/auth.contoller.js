import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utils.js'

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {

        // check if all fields are provided
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please provide all fields" })
        }

        // check if the userpassword is at least 6 characters
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        // check if the email is valid
        // check if the email is already in use
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email already exists" }) // Email already exists
        }
        
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create new user
        const newUser = new User(
            {
                fullName: fullName,
                email: email,
                password : hashedPassword,
            }
        )

        // If user is created successfully, send a response
        if (newUser) {
            // generate jwt token
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id, // Created by MongoDB automatically
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            })
        
        }
        else { // If user is not created successfully, send a response
            return res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ message: "Invalid credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Invalid credentials"})
        }

        // generate token
        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
        })

    }
    catch(error){
        console.log("Error in login controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = (req, res) => {
    try{
        res.cookie('jwt', '', {maxAge: 1}) // Set cookie to expire in 1ms
        res.status(200).json({ message: "Logged out successfully" })
    }
    catch(error){
        console.log("Error in logout controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}