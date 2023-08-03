const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/User')
const { Note } = require('../models/Note')


// Get all users
router.get('/user', async (req, res) => {
    try {
        const users = await User.find({}, 'name email').exec();
        res.json({
            success: true,
            message: "All users fetched successfully!",
            data: users
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


// Creating User
// Request Body: name, email, password 
router.post('/user', async (req, res) => {
    try {
        const newNote = new Note({
            title: "Welcome",
            text: "Thank you for choosing our app"
        })

        const { name, email, password } = req.body;
        const hashedPass = await bcrypt.hash(password, 10) // Pass encryption
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPass,
            notes: [newNote]
        });
        await newUser.save();

        const token = await jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);

        res.json({
            success: true,
            message: "User created successfully!",
            token: token
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


// Get User with specific id
// Request Params: id
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        res.json({
            success: true,
            message: "User found!",
            data: {
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


// Updating User
// Request Body: oldEmail, oldPassword, newName, newEmail, newPassword
// router.put('/user', async (req, res) => {

//     try {
//         const { oldEmail, oldPassword, newName, newEmail, newPassword } = req.body;
//         const user = await User.findOne({ email: oldEmail });

//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found!'
//             });
//         }

//         // Check if password matches
//         const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Authentication failed!'
//             });
//         }

//         // Update the user's name, email and/or password if provided
//         if (newName) {
//             user.name = newName
//         }
//         if (newEmail) {
//             user.email = newEmail;
//         }
//         if (newPassword) {
//             user.password = await bcrypt.hash(newPassword, 10);
//         }
//         await user.save();
//         res.json({
//             success: true,
//             message: "User info updated successfully!"
//         })
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: err.message
//         })
//     }
// });


// Update User with token
// Request Body: name, email, password, token
router.put('/user/:id', async (req, res) => {
    try {
        const { name, email, password, token } = req.body;
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
        if (decodedToken.userId != req.params.id) {
            return res.status(404).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({
            success: true,
            message: "User info updated successfully!"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


// Deleting User
// Request Body:
router.delete('/user/:id', (req, res) => {

});


// Login User
// Request Body: email, password
router.post('/validateuser', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed!'
            });
        }

        // If the password is valid, generate a JWT token
        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

        res.json({
            success: true,
            message: "User logged in successfully!",
            data: {
                name: user.name,
                email: user.email,
                token: token
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


module.exports = router;