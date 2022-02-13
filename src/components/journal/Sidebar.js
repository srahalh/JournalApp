import React from 'react'
import { JournalEntries } from './JournalEntries'
import { useDispatch } from 'react-redux';
import {startLogout} from '../../actions/auth'

export default function Sidebar() {


    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <aside className="jounal__sidebar">
            <div className="jounal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className ="far fa-sun"></i>
                    <span> Said</span>
                </h3>

                <button 
                    className="btn"
                    onClick = {handleLogout}
                    >Logout</button>
            </div>
            <div className="jounal__new-entry">
                <h3 className="mt-5">
                    <i className ="far fa-calendar-plus fa-5x"></i>
                    <p className="mt-5">New Entry</p>
                </h3>
            </div>
        <JournalEntries />
        </aside>
    )
}
