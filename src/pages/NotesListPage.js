import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';


const NotesListPage = () => {
    let [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    let getNotes = async () => {
        try {
            // Replace the URL with the endpoint of your deployed Django API on Render
            let response = await fetch('https://myapi-x4jf.onrender.com/api/notes');
            let data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>&#9782; Notes</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>
            <div className='notes-list'>
                {notes.map((note, index) => (
                    <ListItem key={index} note={note} />
                ))}
            </div>
            <AddButton />
        </div>
    );
};

export default NotesListPage;
