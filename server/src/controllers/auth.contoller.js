import User from '../models/user.model.js'

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
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
            const token = generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
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

export const login = (req, res) => {
    res.send('Login controller')
}

export const logout = (req, res) => {
    res.send('Logout controller')
}