const uuid = require("../helpers/utils.js");
const express = require("express");
const fs = require("fs");
const router = express.Router();

function getNotes(){
    return JSON.parse(fs.readFileSync("db/db.json"))
}


router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for feedback`);
    
    const notes = getNotes();
    res.json(notes);

  });



router.post('/notes', (req, res) => {
    const notes = getNotes();
    const { title, text } = req.body;

    if ( title && text ) {
        
        const newNote = {
            title : title,
            text: text,
            id : uuid(),
        };

        notes.push(newNote)
        fs.writeFileSync('db/db.json', JSON.stringify(notes));

        
        const response = {
            status: 'success',
            body: newNote,
          };

          res.json(response);
        } else {
            res.json('Error in posting note');
        }
    }
)

router.delete('/notes/:id', (req, res) => {
    const notes = getNotes();
    const savedNotes = notes.filter(note => note.id !== req.params.id)
    fs.writeFileSync('db/db.json', JSON.stringify(savedNotes));
    res.json("deleted");

})


module.exports = router; 