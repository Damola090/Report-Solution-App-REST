const User = require('../Models/User');
const CatchAsyncErrors = require('../Middleware/CatchAsyncErrors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
//Register User 
//login User


const registerUser = CatchAsyncErrors(async (req, res, next) => {

    try {

        const userExists = await User.findOne({ email: req.body.email })

        if (userExists) {
            res.status(400).json({
                success: 'false',
                message: 'User already Exists'
            })

            return;
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const user = await User.create(req.body)

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({
            success: true,
            message: "The user has been Created",
            data: token,
            user: user
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "User Failed to Be created ",
            err
        })
    }
})


const loginUser = CatchAsyncErrors(async (req, res, next) => {

    try {

        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            res.status(403).json({
                success: 'false',
                message: 'User Does Not exists'
            })

            return;
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res
                .status(200)
                .json({ message: "Password is incorrect", success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            res.status(200).json({
                message: "Login successful",
                success: true,
                data: token,
                user: user
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "login Failed ",
            err
        })
    }
})

const getMyProfile = async (req, res, next) => {

    try {

        const user = await User.findById(req.user._id)

        res.status(200).json({
            success: true,
            user: user
        })
    } catch (err) {

        res.status(400).json({
            success: false,
            message: 'Unable to fetch user Profile'
        })
    }

}

module.exports = {
    registerUser,
    loginUser,
    getMyProfile
}