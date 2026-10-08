import React, { useEffect, useState } from 'react'
import './PostList.css'

function PostListDemo() {
  const[posts, setPosts] = useState([])
  const[editingPostId, setEditingPostId] = useState(null);
  const[editedTitle, setEditedTitle] = useState('')
  const[editedContent, setEditedContent] = useState('')
  const fetchPosts = async () => {
    try{
    await fetch('http://localhost:5000/api/posts')
        .then(response => response.json())
        .then(data => setPosts(data))
    }catch(err){
        console.error(err)
    }
  }
  useEffect(()=>{
    fetchPosts()
  },[])

  const handleDelete = async (id) => {
   try{
     const res = await fetch('http://localhost:5000/api/posts',{
        method: "DELETE",
        headers: {'Content-Type':"application/json"},
        body: JSON.stringify({id})
    })
    const data = await res.json()
    console.log(data.message)
    if(res.ok){
        // fetchPosts()
        setPosts(prev => prev.filter(post => post._id !== id))
    }else{
        alert(data.message)
    }
    }
    catch(err){
        console.error(err)
    }
  }

  const handleSave = async (id) => {
    try{
            const res = await fetch('http://localhost:5000/api/posts',{
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({id, title: editedTitle, content: editedContent})
        })
        const data = await res.json()
        console.log(data.message)
        if(res.ok){
            setPosts(prev=>
                prev.map(post=>
                    post._id === id ? {...post, title: editedTitle, content: editedContent}:post
                )
            )
            setEditingPostId(null)
        }else{
            alert(data.message);
        }
    }catch(err){
        console.error(err)
    }
  }

  return (
    <div>
        {
            posts.map(post =>(
                <div className='blog-card' key={post._id}>
                    {
                        editingPostId === post._id ? (
                            <>
                                <input type="text"
                                 value = {editedTitle}
                                 onChange={(e)=>setEditedTitle(e.target.value)}
                                 placeholder='Enter New Title'
                                />
                                <textarea
                                 value={editedContent}
                                 onChange={(e)=> setEditedContent(e.target.value)}
                                 placeholder='Enter Updated Content'
                                ></textarea>
                                <div>
                                    <button
                                        onClick={()=> handleSave(post._id)}
                                    >Save</button>
                                    <button 
                                        onClick={()=> setEditingPostId(null)}
                                    >Cancel</button>
                                </div>
                            </>
                        ):(
                         <>
                            <h1 className='post-title'>{post.title}</h1>
                            <p>{post.content}</p>
                            <small>{new Date(post.createdAt).toLocaleString()}</small>
                            <div>
                                <button onClick={() => handleDelete(post._id)}>Delete</button>
                                <button
                                onClick={()=>{
                                    setEditingPostId(post._id)
                                    setEditedTitle(post.title)
                                    setEditedContent(post.content)
                                }}
                                >Update</button>
                            </div>             
                          </>       
                    )
                    }
                </div>
            ))
        }
    </div>
  )
}

export default PostListDemo