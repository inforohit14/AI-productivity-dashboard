import { useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  function addNote() {
    if (!input) return;
    setNotes([...notes, input]);
    setInput("");
  }

  return (
    <div className="page">
      <h2>Notes</h2>

      <div className="card">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a note..."
        />
        <button className="btn-primary" onClick={addNote}>
          Add
        </button>
      </div>

      {notes.map((note, i) => (
        <div key={i} className="card">
          {note}
        </div>
      ))}
    </div>
  );
}