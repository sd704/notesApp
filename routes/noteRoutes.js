const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { User } = require('../models/User')
const { Note } = require('../models/Note')


// Get all notes
router.get('/user/:uid/note', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.uid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        res.json({
            success: true,
            message: "All notes fetched sucessfully!",
            notes: user.notes
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


// Get a specific note
router.get('/user/:uid/note/:nid', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.uid, 'notes._id': req.params.nid }, { 'notes.$': 1 });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        if (!user.notes || user.notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Note not found!'
            });
        }

        res.json({
            success: true,
            message: "Note found!",
            notes: user.notes[0]
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

});


//Add a note
// Request Body: title, text, token
router.post('/user/:uid/note', async (req, res) => {
    try {
        const { title, text, token } = req.body;
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
        if (decodedToken.userId != req.params.uid) {
            return res.status(404).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const user = await User.findOne({ _id: req.params.uid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        const newNote = new Note()

        if (title) { newNote.title = title; }
        if (text) { newNote.text = text }

        user.notes.push(newNote);
        await user.save();

        res.json({
            success: true,
            message: "Note added successfully!",
            note: newNote
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


// Update Note
// Request Body: title, text, completed, token 
router.put('/user/:uid/note/:nid', async (req, res) => {
    try {
        const { title, text, completed, token } = req.body;
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
        if (decodedToken.userId != req.params.uid) {
            return res.status(404).json({
                success: false,
                message: 'Invalid token'
            });
        }

        // Using updateOne() to safely update the array element
        const result = await User.updateOne(
            { _id: req.params.uid, 'notes._id': req.params.nid },
            {
                $set: {
                    'notes.$.title': title,
                    'notes.$.text': text,
                    'notes.$.completed': completed
                }
            }
        );

        if (result.nModified === 0) {
            return res.status(404).json({
                success: false,
                message: 'Note not found or not updated!'
            });
        }

        res.json({
            success: true,
            message: "Note updated successfully!",
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


// Delete Note
// Request Body: token
router.delete('/user/:uid/note/:nid', async (req, res) => {
    try {
        const { token } = req.body;
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
        if (decodedToken.userId != req.params.uid) {
            return res.status(404).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const user = await User.findOne({ _id: req.params.uid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        // Find the index of the note with note id = nid in the notes array
        const noteIndexToDelete = user.notes.findIndex(note => note._id == req.params.nid);

        if (noteIndexToDelete === -1) {
            return res.status(404).json({
                success: false,
                message: 'Note not found!'
            });
        }

        // Remove the note at the specified index
        user.notes.splice(noteIndexToDelete, 1);

        // Save the updated user document
        await user.save();

        res.json({
            success: true,
            message: "Note deleted successfully!",
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

});


// Delete All Notes
router.delete('/user/:uid/note', async (req, res) => {

});

module.exports = router;