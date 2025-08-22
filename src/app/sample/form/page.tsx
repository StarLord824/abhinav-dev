'use client'
import { useState } from "react"
import axios from "axios"
export default function(){
    const [user, setUser] = useState("");
    const [username, setUsername]=useState("")
    return (
    <>
        <div className="flex flex-col w-1/3 mt-40 gap-10">
            <input className="bg-white text-black" placeholder="user" type="text" value={user} onChange={(e)=>{setUser(e.target.value)}}/>
            <input className="bg-white text-black" placeholder="username" type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <button onClick={ async ()=>{
                axios.post("http:/localhost:3000/api/sample",{
                    user,
                    username
                })
                setUser("")
                setUsername("")
            }}>Submit</button>
        </div>
    </>   
)}