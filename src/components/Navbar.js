import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"

// const API = "http://localhost:5001/api"
// const API = "http://notetaker.pythonanywhere.com/api"

const Navbar = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(Cookies.get("nt-user")){
            //
        }
        else{
            navigate("/login")
        }
    }, [])

  return (
    <div>
        <nav className="navbar py-4" style={{
                background: "linear-gradient(to bottom right, #FF9F4A, #FF3C83)",
                borderBottomLeftRadius: "50px",
                borderBottomRightRadius: "50px"
            }}>
            <div className="container-fluid">
                <Link className="navbar-brand text-white" to={"/"}>
                    <img src="/logo.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" 
                        style={{borderRadius: "10px"}}
                    />
                    Note Taker
                </Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar