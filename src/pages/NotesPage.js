// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
// import { v4 as uuidv4 } from 'uuid';

// const BASE_URL = 'http://127.0.0.1:8000/api/notes';

// const getOrCreateDeviceId = () => {
//   let deviceId = localStorage.getItem('device_id');
//   if (!deviceId) {
//     deviceId = uuidv4();
//     localStorage.setItem('device_id', deviceId);
//   }
//   return deviceId;
// };

// const NotesPage = () => {
//   const { id } = useParams(); // Use useParams hook to get route parameters
//   let [note, setNote] = useState(null);
  
//   useEffect(() => {
//     getNotes();
//   }, [id]);

//   const getNotes = async () => {
//     if (id === 'new') return;
//     const deviceId = getOrCreateDeviceId();
//     let response = await fetch(`${BASE_URL}/${id}`, {
//       headers: {
//         'X-Device-ID': deviceId
//       }
//     });
//     let data = await response.json();
//     setNote(data);
//   };

//   const updateNote = async () => {
//     const deviceId = getOrCreateDeviceId();
//     await fetch(`${BASE_URL}/${id}/`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Device-ID': deviceId
//       },
//       body: JSON.stringify(note)
//     });
//   };

//   const createNote = async () => {
//     const deviceId = getOrCreateDeviceId();
//     await fetch(`${BASE_URL}/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Device-ID': deviceId
//       },
//       body: JSON.stringify(note)
//     });
//   };

//   const deleteNote = async () => {
//     const deviceId = getOrCreateDeviceId();
//     await fetch(`${BASE_URL}/${id}/`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Device-ID': deviceId
//       }
//     });
//     window.history.back();
//   };

//   const handleSubmit = () => {
//     if (id !== 'new' && !note.body) {
//       deleteNote();
//     } else if (id !== 'new') {
//       updateNote();
//     } else if (id === 'new' && note !== null) {
//       createNote();
//     }
//     window.history.back();
//   };

//   return (
//     <div className='note'>
//       <div className='note-header'>
//         <h3>
//           <ArrowLeft onClick={handleSubmit} />
//         </h3>
//         {id !== 'new' ? (
//           <button onClick={deleteNote}>Delete</button>
//         ) : (
//           <button onClick={handleSubmit}>Done</button>
//         )}
//       </div>
//       <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} value={note?.body}>
//       </textarea>
//     </div>
//   );
// };

// export default NotesPage;

import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const BASE_URL = 'https://efeoghene.pythonanywhere.com/api/notes';

// const BASE_URL = 'http://127.0.0.1:8000/api/notes';
const NotesPage = () => {
   
        const { id } = useParams(); // Use useParams hook to get route parameters
        
        
        // let note = notes.find(note => note.id === Number(id));
        let[note, setNote] = useState(null)
        //always set state at the first level of the component

        useEffect(() =>{
            getNotes()
        }, [id])

        let getNotes = async () => {
            if (id === 'new') return;
            let response = await fetch(`${BASE_URL}/${id}`);
            let data = await response.json();
            setNote(data);
        };

        let updateNote = async () => {
            await fetch(`${BASE_URL}/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });
        };
        
        let createNote = async () => {
            await fetch(`${BASE_URL}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });
        };
    
        
        let deleteNote = async () => {
            await fetch(`${BASE_URL}/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.history.back();
        };

        // `http://127.0.0.1:8000/api/notes/${id}/delete/`

        let handleSubmit = () =>{

            if(id !== 'new' && !note.body){
                deleteNote()
            }else if(id !=='new'){
                updateNote()
            }else if(id === 'new' && note !== null){
                createNote()
            }
            // updateNote()
            window.history.back() //push method wasn't defined and won't work on history the way you used it because it is a paremeter entering your function NotesPage. Perhaps it could work but probably not with .push() method, I don't know. This code gives you what you want. You can use alt+Z to escape this word wrap form if you don't like it
        }
    
        return(
            <div className='note'>
                <div className='note-header'>
                    <h3>
                        {/* <Link to='/'> */}
                            <ArrowLeft onClick={handleSubmit}/>
                        {/* </Link> */}
                    </h3>
                    {id !== 'new' ?(
                        <button onClick={deleteNote}>Delete</button>
                    ): (
                        <button onClick={handleSubmit}>Done</button>
                    )}

                </div>

                <textarea onChange={(e)=> {setNote({...note, 'body' :e.target.value })}} value={note?.body}>
                </textarea>
            </div>
           
        )
        
}



export default NotesPage

