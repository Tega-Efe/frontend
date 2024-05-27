import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const BASE_URL = 'https://myapi-x4jf.onrender.com/api/notes';


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

