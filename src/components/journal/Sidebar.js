import React from "react";
import { JournalEntries } from "./JournalEntries";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import {startNewNote} from "../../actions/notes"

export default function Sidebar() {
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.auth); //Extrae del state el auth, y luego se desestructura

  const handleLogout = () => {
    dispatch(startLogout());
  };
  const handleAddNew = () => {
    dispatch( startNewNote() );
  };

  return (
    <aside className="jounal__sidebar">
      <div className="jounal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-sun"></i>
          <span> {name}</span>
        </h3>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="jounal__new-entry" onClick={handleAddNew}>
        <h3 className="mt-5">
          <i className="far fa-calendar-plus fa-5x"></i>
          <p className="mt-5">New Entry</p>
        </h3>
      </div>
      <JournalEntries />
    </aside>
  );
}
