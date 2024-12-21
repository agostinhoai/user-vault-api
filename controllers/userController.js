const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Contact = require('../models/contactModel');

//@desc Register new user
//@route POST /api/users/register
//@access Public
const registerUser  = asyncHandler(async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password) {
            res.status(400);        
            throw new Error("All fields are mandatory");
        }

        const userAvailable = await User.findOne({email});
        if(userAvailable) {
            res.status(400);
            throw new Error("This email is already in use");
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            contacts: []
        });

        if(user) {
            res.status(201).json({
                message: "Account registered",
                _id: user.id,
                email: user.email
            });
        } else {
            res.status(400);
            throw new Error("User data is not valid");
        }
    } catch (error) {
        if (!res.statusCode) {
            res.status(500);
        }
        throw error;
    }
});

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30m' }
            );

            res.status(200).json({
                message: "Login successful",
                accessToken,
                _id: user.id,
                email: user.email
            });
        } else {
            res.status(401);
            throw new Error("Email or password is not valid");
        }
    } catch (error) {
        throw error;
    }
});

//@desc Current user info
//@route GET /api/users/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

//@desc Delete user
//@route DELETE /api/users/delete-user
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        // Delete all contacts associated with the user
        await Contact.deleteMany({ user_id: req.user.id });
        
        // Delete the user
        await User.findByIdAndDelete(req.user.id);
        
        res.status(200).json({ message: "User and associated contacts deleted successfully" });
    } catch (error) {
        throw error;
    }
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    deleteUser
};
