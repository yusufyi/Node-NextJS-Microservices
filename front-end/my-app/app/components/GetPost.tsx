import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { NextResponse, NextRequest } from 'next/server'



export const GetPost = (token: any) => {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        console.log('f:', token.token, 'bb:');

        if (token) {
            fetch('http://localhost:3005/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token.token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setPosts(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, []);

    const handleLogout = () => {
        
            // Clear the token from local storage or state
            localStorage.removeItem('token');
            // Redirect the user to the login page after logout
            window.location.href = '/login';
            
        };


 

    useEffect(() => {
        // Add any additional logic you need here
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4">
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
                Logout
            </button>
            {posts.map((p) => (
                <div key={p.id} className="bg-white shadow-md p-4 rounded-md">
                    <h1 className="text-xl font-semibold mb-2">{p.title}</h1>
                    <p className="text-base">{p.content}</p>
                </div>
            ))}
        </div>
    );
};
