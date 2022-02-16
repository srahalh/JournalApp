import Swal from "sweetalert2";

import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth; //Necesito el ID porque es el inicio de mi coleccion
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote)); //Deberia buscar la manera de listar las notas nuevas para no realizar esta accion
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = ( id, note ) => ({
  type: types.notesAddNew,
  payload: {
      id, ...note
  }
})

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNotes = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!note.url) {
      //Firebase no acepta campos undefind
      delete note.url;
    }
    const noteToFirestore = { ...note }; //Extraemos los elementos para no vincularlos.
    delete noteToFirestore.id;
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote(note.id, noteToFirestore));
    Swal.fire('Saved', note.title, 'success'); 
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    }
  }
});

export const startUploading = (file) =>{
  return async (dispatch, getState) => {
    const {active:activeNote} = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text: 'Please waite...',
      allowOutsideClick: false,
      onBeforeOpen: () =>{
        Swal.showLoading();
      }
    });

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;

    dispatch(startSaveNotes(activeNote)); 
    
    Swal.close(); 
  }

}

export const startDeleting = (id) =>{
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch(deleteNote(id)); 
  }
}

export const deleteNote = (id) =>({
  type: types.notesDelete,
  payload: id 
})
  
export const noteLogout = () => ({
  type: types.notesLogoutCleaning
})

