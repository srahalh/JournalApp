import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) =>{
   const notesSnap = await db.collection(`${uid}/journal/notes`).get();
   const notes = [];

   notesSnap.forEach( snapChild => {
       notes.push({
           id: snapChild.id,
           ...snapChild.data() //El data() es el metodo que te da firestore para traer los datos
       })
   })

   return notes;
}