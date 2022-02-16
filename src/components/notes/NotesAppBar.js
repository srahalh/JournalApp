import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNotes, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note /*Una forma de renombrar */ } = useSelector(
    (state) => state.notes
  );
  function handleSaveNote() {
    dispatch(startSaveNotes(note));
  }
  function handlePictureClick() {
      document.querySelector('#fileSelector').click()
  }
  function handleFileChange(e) {
      const file = e.target.files[0];
      if(file){
          dispatch(startUploading(file))
      }
  }
  return (
    <div className="notes__appbar">
      <span>28 Ago 2021</span>
      <input
        id="fileSelector"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="">
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>
        <button onClick={handleSaveNote} className="btn">
          Save
        </button>
      </div>
    </div>
  );
};
