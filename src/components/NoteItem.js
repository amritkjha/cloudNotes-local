import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";


const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const delNote = (e) => {
        e.preventDefault();
        deleteNote(note._id)
    }
    const edNote = (e) => {
        e.preventDefault();
        updateNote(note);
    }
    return (
        <div className="col-md-3">
            {/* {note.title}
            {note.description} */}
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-centre">
                        <h5 className="card-title">{note.title}</h5>
                        <a className="cursor" onClick={delNote}><small className="mx-2"><u>Delete</u></small></a>
                        <a className="cursor" onClick={edNote}><small className="mx-2"><u>Edit</u></small></a>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;