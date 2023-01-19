const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');

//Route 1: Get all the notes login required
router.get('/fetchallnotes', fetchUser, async(req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
})

//Route 2: Add a new note login required
router.post('/addnote', fetchUser, 
body('title', 'Enter a valid title').isLength({min: 3}), 
body('description', "Description too short").isLength({min: 5}), 
async(req, res)=>{
    try{
    const { title, description, tag } = req.body;
    //checks errors
    const errors = validationResult(req);
  //returns bad request and errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
title, description, tag, user: req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

//Route 3: Update an existing note login required
router.put('/updatenote/:id', fetchUser, 
async(req, res)=>{
    try{
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        //returns bad request and errors
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        let note = await Notes.findById(req.params.id);
        if(!note){res.status(404).send("Not found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


//Route 4: Delete an existing note login required
router.delete('/deletenote/:id', fetchUser, 
async(req, res)=>{
    try{
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        //returns bad request and errors
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
        let note = await Notes.findById(req.params.id);
        if(!note){res.status(404).send("Not found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted"});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;