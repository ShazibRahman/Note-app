import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom'


export default function Notes() {
    let history = useNavigate()
    const context = useContext(NoteContext)
    const { notes, editNote, getNotes } = context;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

    useEffect(() => {
        if (localStorage.getItem('token')) getNotes()
        else history("/login")
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })


    }
    const handleClick = (e) => {
        e.preventDefault()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        ref2.current.click()

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }
    const ref = useRef(null)
    const ref2 = useRef(null)

    return (
        <>
            <AddNote />
            <button type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={ref2} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h1>Your notes</h1>
                <div className="container">
                    {notes.length === 0 && "No notes to display"}
                </div>

                {notes.map((note) => {
                    return <NoteItem note={note} key={note._id} updateNote={updateNote} />
                })}

            </div>
        </>
    )
}
