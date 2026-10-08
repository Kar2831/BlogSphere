import React from 'react'
import CreatePost from './components/CreatePost/CreatePost'
import PostList from './components/PostList/PostList'

function App() {
  return (
    <div>
<div className="app-layout">
      <div className="sidebar">
        <CreatePost />
      </div>
      <div className="content">
        <PostList />
      </div>
    </div>
    </div>
  )
}

export default App