import React from 'react'
import { NoteScreen } from '../notes/NoteScreen'
// import { NothingSelected } from './NothingSelected'
import Sidebar from './Sidebar'

export const JournalScreen = () => {
    return (
        <div className="jounal__main-content">
            <Sidebar />

            <main>
                {/* <NothingSelected/> */}
                <NoteScreen/>
            </main>
        </div>
            
    )
}
