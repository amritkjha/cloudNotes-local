import React, { useState } from 'react';
import NoteContext from './noteContext';
const NoteState = (props) => {
  const host = "http://localhost:5000";
    const notess = []

      const [notes, setNotes] = useState(notess);

    //get all notes
    const getNotes = async() => {
      //API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZWRhODVmZTQwYmQxZTYwNzgxNWZhIn0sImlhdCI6MTY3MjQwOTM1MX0.EqVk_yfVrKmOQr1HDOFyzXPaF_xxCwSBwnmWthqEdOs"
        }})
        const json = await response.json();
        // console.log(json);
        setNotes(json);
    }

    //Add a note
    const addNote = async(title, description, tag) => {
      //API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZWRhODVmZTQwYmQxZTYwNzgxNWZhIn0sImlhdCI6MTY3MjQwOTM1MX0.EqVk_yfVrKmOQr1HDOFyzXPaF_xxCwSBwnmWthqEdOs"
        },
        body: JSON.stringify({title, description, tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    }

    //Delete a note
    const deleteNote = async(id) => {
      //API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZWRhODVmZTQwYmQxZTYwNzgxNWZhIn0sImlhdCI6MTY3MjQwOTM1MX0.EqVk_yfVrKmOQr1HDOFyzXPaF_xxCwSBwnmWthqEdOs"
        }
      });
      const json = response.json();

      console.log("Deleting note with id: " + id + json);
      const newNotes = notes.filter((note)=>{return note._id !== id});
      setNotes(newNotes);
    }

    //Edit a note
    const editNote = async(id, title, description, tag) => {
      //API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZWRhODVmZTQwYmQxZTYwNzgxNWZhIn0sImlhdCI6MTY3MjQwOTM1MX0.EqVk_yfVrKmOQr1HDOFyzXPaF_xxCwSBwnmWthqEdOs"
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();
      console.log(json);

      const newNotes = JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < notes.length; index++) {
        const element = newNotes[index];
        if(element._id === id)
        {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;