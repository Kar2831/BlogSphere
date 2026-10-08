import React from 'react'
import { useState } from 'react'
import './CreatePost.css'

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await fetch('http://localhost:5000/api/posts',{
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({title, content})
        });
        setTitle("")
        setContent("")
        window.location.reload()
    }
  return (
    <div className='create-post'>
        <form onSubmit={handleSubmit}>
            <input type="text"
             placeholder = "Blog title"
             required
             value={title}
             onChange={(e)=> setTitle(e.target.value)}
            />
            <textarea 
              placeholder='Blog Content'
              required
              value = {content}
              onChange = {(e)=> setContent(e.target.value)}
            ></textarea>
            <button type='submit'>Add Post</button>
        </form>
    </div>
  )
}

export default CreatePost