import express from "express"
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById } from "../controllers/notesControllers.js"

const router = express.Router()

//Get all notes
router.get("/", getAllNotes)
//Get note by id
router.get("/:id", getNoteById)
//Create new note
router.post("/", createNote)
//Edit a note
router.put("/:id", updateNote)
//Delete a note
router.delete("/:id", deleteNote)

export default router