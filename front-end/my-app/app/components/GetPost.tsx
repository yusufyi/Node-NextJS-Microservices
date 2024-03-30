import React, { use } from 'react'
import { useState,useEffect} from 'react'

export const GetPost = (token:any) => {
    const [posts, setPosts] = useState<any[]>([])
    useEffect(() => {
        console.log('f:',token.token,'bb:')
    if (token) {
        fetch('http://localhost:3005/posts', {  
            method: 'GET',
            headers: {
                'Content-Type': 'application /json',
                'Authorization': `${token.token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setPosts(data)
        })
        .catch (error => {
            console.error('Error:', error);
        })
    }}, [])
    return (
        <div className="grid grid-cols-1 gap-4">
  {posts.map((p) => (
    <div key={p.id} className="bg-white shadow-md p-4 rounded-md">
      <h1 className="text-xl font-semibold mb-2">{p.title}</h1>
      <p className="text-base">{p.content}</p>
    </div>
  ))}
</div>
    )
}
