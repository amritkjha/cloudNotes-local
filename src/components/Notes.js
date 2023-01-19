import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
    const a = useContext(NoteContext);
    const { notes, getNotes, editNote } = a;
    useEffect(()=>{
      getNotes();
    },[])
    const ref = useRef(null);
    const refModal = useRef(null);
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""});
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        console.log(note);
        refModal.current.click();
    }
  return (
    <div className="row">
        <AddNote />
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                    <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Note title</label>
                    <input type="text" className="form-control" value={note.etitle} id="etitle" required minLength={5} name="etitle" onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Note description</label>
                    <input type="text" className="form-control" value={note.edescription} id="edescription" required minLength={5} name="edescription" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Note tag</label>
                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" required minLength={5} onChange={onChange} />
                    </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
        <h1>CloudNotes - your notes on cloud</h1>
        {notes.length===0 && 'No notes. Add a note to start viewing notes.'}
        {notes.map((note) => {
            return <NoteItem note={note} updateNote={updateNote} />;
        })}
    </div>
  );
};

export default Notes;
