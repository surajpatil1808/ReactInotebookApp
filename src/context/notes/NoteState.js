import React from "react";
import { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);


  //get All Notes
  const getNotes = async () => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YTIyOGVkMGNkOWQ5NmRmMDkxZThhIn0sImlhdCI6MTY4MzYyODY4Nn0.WGFN3QfEa8dNNbPulVTNVExvE_okCF88QAsr3SF5aSI",
      }
   
    });
    const json=await response.json()
    console.log(json)
    setNotes(json)

 

  }



  //Add a Note
  const addNote = async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YTIyOGVkMGNkOWQ5NmRmMDkxZThhIn0sImlhdCI6MTY4MzYyODY4Nn0.WGFN3QfEa8dNNbPulVTNVExvE_okCF88QAsr3SF5aSI",
      },
      body: JSON.stringify(title, description, tag),
    });

    console.log("adding a note");
    const note = {
      _id: "645b38sdsdb39a27d3sdsdaa65399061",
      user: "645a228ed0cd9d96df091e8a",
      title: title,
      description: description,
      tag: tag,
      date: "2023-05-10T06:24:51.122Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = (id) => {
    console.log("Note deleted id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //Api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YTIyOGVkMGNkOWQ5NmRmMDkxZThhIn0sImlhdCI6MTY4MzYyODY4Nn0.WGFN3QfEa8dNNbPulVTNVExvE_okCF88QAsr3SF5aSI",
      },
      body: JSON.stringify(title, description, tag),
    });
    const json = response.json();

    //Logic to edit
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
