/* eslint-disable no-unused-vars */
import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    const ip = process.env.REACT_APP_IP || 'localhost'
    console.log(ip);
    const host = `http://${ip}:4000`


    // Add a note 
    const addNote = async (title, description, tag) => {
        const url = `${host}/api/notes/addnote`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description, tag })
            });
            const json = await response.json()
            if (response.status === 200) setNotes(notes.concat(json))
            else return
            // console.log(json);


        } catch (error) {


        }

    }

    // Delete a note
    const deleteNote = async (id) => {
        const newNotws = notes.filter(note => note._id !== id)
        setNotes(newNotws)
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")

            },
        });
    }
    let newNotes = JSON.parse(JSON.stringify(notes))
    const editNote = async (id, title, description, tag) => {
        const url = `${host}/api/notes/updatenote/${id}`
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("token")

                },
                body: JSON.stringify({ title, description, tag })
            });
            if (response.status !== 200) return

            for (let index = 0; index < newNotes.length; index++) {

                if (newNotes[index]._id === id) {
                    newNotes[index].title = title
                    newNotes[index].description = description
                    newNotes[index].tag = tag
                    break;
                }

            }
            console.log(newNotes);
            setNotes(newNotes)
        } catch (eror) {

        }


    }
    const getNotes = async (title, description, tag) => {
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")

            }
        });
        const json = await response.json()
        setNotes(json)

    }

    //Edit a Note
    return (
        // eslint-disable-next-line react/jsx-pascal-case
        < NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
            {props.children}
        </ NoteContext.Provider>
    )

}


export default NoteState