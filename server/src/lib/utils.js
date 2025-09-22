import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('jwt', token, { httpOnly: true, // Prevent XSS attacks
        sameSite: 'strict', // Prevent CSRF attacks
        secure: process.env.NODE_ENV !== 'development', // Only send cookie over HTTPS in production
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    return token
}