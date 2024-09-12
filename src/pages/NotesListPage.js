import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'https://efeoghene.pythonanywhere.com/api/notes/';

const getOrCreateDeviceId = () => {
  let deviceId = localStorage.getItem('device_id');
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem('device_id', deviceId);
  }
  return deviceId;
};

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    try {
      const deviceId = getOrCreateDeviceId();
      let response = await fetch(BASE_URL, {
        headers: {
          'X-Device-ID': deviceId
        }
      });
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

// import React, { useState, useEffect } from 'react';
// import ListItem from '../components/ListItem';
// import AddButton from '../components/AddButton';

// // const BASE_URL = 'http://127.0.0.1:8000/api/notes';
// const NotesListPage = () => {
//     let [notes, setNotes] = useState([]);

//     useEffect(() => {
//         getNotes();
//     }, []);

//     let getNotes = async () => {
//         try {
//             // Replace the URL with the endpoint of your deployed Django API on Render
//             let response = await fetch('https://efeoghene.pythonanywhere.com/api/notes');
//             let data = await response.json();
//             setNotes(data);
//         } catch (error) {
//             console.error('Error fetching notes:', error);
//         }
//     };

//     return (
//         <div className='notes'>
//             <div className='notes-header'>
//                 <h2 className='notes-title'>&#9782; Notes</h2>
//                 <p className='notes-count'>{notes.length}</p>
//             </div>
//             <div className='notes-list'>
//                 {notes.map((note, index) => (
//                     <ListItem key={index} note={note} />
//                 ))}
//             </div>
//             <AddButton />
//         </div>
//     );
// };

// export default NotesListPage;
