const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { User } = require('../models/User')
const { Note } = require('../models/Note')


router.get('/allusers', (req, res) => {

});

router.post('/user', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed!' });
        }

        // If the password is valid, generate a JWT token
        // const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        // res.json({ token });

        res.json({ message: "User logged in successfully!" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.post('/createuser', async (req, res) => {
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
        res.json({ message: "User created successfully!" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.put('/updateuser', async (req, res) => {

    try {
        const { oldEmail, oldPassword, newName, newEmail, newPassword } = req.body;
        const user = await User.findOne({ email: oldEmail });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Check if password matches
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed!' });
        }

        // Update the user's name, email and/or password if provided
        if (newName) {
            user.name = newName
        }
        if (newEmail) {
            user.email = newEmail;
        }
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }
        await user.save();
        res.json({ message: "User info updated successfully!" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.delete('/deleteuser', (req, res) => {

});

module.exports = router;