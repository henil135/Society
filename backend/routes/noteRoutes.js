const express = require('express');
const { createNote, updateNote, getAllNotes, getNoteById } = require('../controller/noteController');
const router = express.Router();


router.post('/addnotes', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/updatenote/:id',updateNote);


module.exports = router;
