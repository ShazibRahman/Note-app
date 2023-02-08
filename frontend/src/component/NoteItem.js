import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props
    const handleDeleteNote = () => {
        deleteNote(note._id)
    }


    return (
        <div className='col-md-4'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex mb-3 ">
                        <div className='me-auto p-2'><h5 className="card-title">{note.title}</h5></div>
                        <div className='p-2'><i className="far fa-edit mx-2" onClick={() => updateNote(note)}></i></div>
                        <div className='p-2'> <i className="fa-solid fa-trash-can mx-2" onClick={handleDeleteNote}></i></div>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>

        </div>
    )
}
