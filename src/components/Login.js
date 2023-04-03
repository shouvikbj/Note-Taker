import React from 'react'
import Cookies from "js-cookie"
import { Link, useNavigate } from 'react-router-dom'

// const API = "http://localhost:5001/api"
const API = "https://notetaker.pythonanywhere.com/api"

const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = document.getElementById("login-form")
    fetch(`${API}/login`, {
      method: "POST",
      body: new FormData(form),
      mode: "cors"
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      if(data.message==="ok"){
        Cookies.set("nt-user", data.email, {expires: 365})
        navigate("/")
      }
      else{
        alert("Wrong credentials!")
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
        <div className="card" style={{
          width: "20rem", 
          // borderRadius: "20px",
          borderBottomLeftRadius: "50px",
          borderTopRightRadius: "50px",
          borderTopLeftRadius: "0px",
          borderBottomRightRadius: "0px"
        }}>
          <h3 className="card-title text-center mt-4">Login</h3>
          <div className="card-body">
            <form id="login-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input style={{borderRadius: "50px"}} type="email" className="form-control" id="exampleInputEmail1" name="email" required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input style={{borderRadius: "50px"}} type="password" className="form-control" id="exampleInputPassword1" name="password" required/>
              </div>
              <button type="submit" className="btn btn-outline-primary" style={{float: "right", borderRadius: "50px"}}>Login</button>
            </form>
            <Link to={"/signup"} className="btn btn-outline-success" style={{float: "left", borderRadius: "50px"}}>Signup</Link>
          </div>
        </div>
    </div>
  )
}

export default Login