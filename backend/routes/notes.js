const express = require('express')
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Note')
const router = express.Router()
const { body, validationResult } = require('express-validator')


//get all nodes // login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    console.log("fetch all notes called");
    try {
        const notes = await Note.find({ user: req.user.id })
        return res.json(notes)

    } catch (error) {
        res.status(500).send({ message: "something went wrong" })

    }

})
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').trim().isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').trim().isLength({ min: 5 })

], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array() })

    try {
        const { title, description, tag } = req.body
        const note = await Note.create({
            title, description, tag, user: req.user.id
        })
        return res.send(note)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
    }
})

// updating an existing note //  /api/notes/updatenote login required

router.put("/updatenote/:id", fetchUser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        const newNote = {}
        if (title) newNote.title = title
        if (description) newNote.description = description
        if (tag) newNote.tag = tag

        // find the note to be updated

        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send({ message: "Not Found" })
        if (note.user.toString() !== req.user.id) return res.status(401).send({ message: "Not Allowed" })
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        return res.send(note)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })

    }
})

// deleting an existing note //   /api/notes/deletenote   login required  

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {
        // find the note to be delete 
        let note = await Note.findById(req.params.id)
        if (!note) return res.status(404).send({ message: "Not Found" })
        if (note.user.toString() !== req.user.id) return res.status(401).send({ message: "Not Allowed" }) //allows only if user owns the note
        note = await Note.findByIdAndDelete(req.params.id)
        return res.send({ "success": "Note has been deleted", note })

    } catch (error) {
        res.status(500).send({ message: "something went wrong" })

    }

})




module.exports = router