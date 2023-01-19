import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = () => {
    const a = useContext(NoteContext);
    const {addNote} = a;
    const [note, setNote] = useState({title:"", description:"", tag:""});

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
    }
    return (
        <div>
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Note title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title} required minLength={5} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Note description</label>
                <input type="text" className="form-control" id="description" name="description" value={note.description} required minLength={5} onChange={onChange} />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Note tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} required minLength={5} onChange={onChange} />
                </div>
                <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}

export default AddNote;