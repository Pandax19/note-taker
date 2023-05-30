const uuid = require("../helpers/utils");
const express = require("express");
const fs = require("fs");
const router = express.Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


router.post('/notes', (req, res) => {

    const { title, text } = req.body;

    if ( title && text ) {
        
        const newNote = {
            title : title,
            text: text,
            id : uuid(),
        };

        readAndAppend(newNote, '../db/db.json');

        const response = {
            status: 'success',
            body: newNote,
          };

          res.json(response);
        }else{
            res.json('Error in posting note');
        }
    }
)

module.exports = router; 