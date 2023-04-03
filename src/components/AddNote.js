import React, {useState} from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Navbar from './Navbar'

// const API = "http://localhost:5001/api"
const API = "https://notetaker.pythonanywhere.com/api"

const AddNote = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState("")

    const handleSubmit = () => {
        fetch(`${API}/${Cookies.get("nt-user")}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({data: value})
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.message === "ok"){
                alert("Note saved!")
                navigate("/")
            }
            else{
                alert("Could not save note!")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <>
        <Navbar/>
        <div className='container py-4'>
            <h2>Add New Note</h2>
        </div>
        <div className='container'>
            <ReactQuill theme="snow" onChange={setValue}
                style={{ width: "100%" }}
            />
            <button className='btn btn-outline-primary' onClick={handleSubmit} style={{
                float: "right",
                borderRadius: "50px",
                marginTop: "10px"
            }}>Submit</button>
        </div>
    </>
  )
}

export default AddNote