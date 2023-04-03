import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'

// const API = "http://localhost:5001/api"
const API = "http://notetaker.pythonanywhere.com/api"

const Home = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [notes, setNotes] = useState([])

  const handleLogout = () => {
    Cookies.remove("nt-user")
    navigate("/login")
  }

  useEffect(() => {
    setUserEmail(Cookies.get("nt-user"))
    fetch(`${API}/get/${Cookies.get("nt-user")}/name`, {
      method: "POST",
      mode: "cors"
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      if(data.message==="ok"){
        setUserName(data.name)
      }
      else{
        alert(data.message)
        navigate("/login")
      }
    })
    .catch(err => {
      console.log(err)
    })
    fetch(`${API}/${Cookies.get("nt-user")}/get`, {
      method: "POST",
      mode: "cors"
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      if(data.message==="ok"){
        setNotes(data.notes)
      }
    })
    .catch(err => {
      console.log(err)
    })
    setIsLoading(false)
  }, [navigate])

  return (
    <>
      <Navbar/>
      <div className='container'>
        <button className="btn btn-danger my-4" style={{borderRadius: "50px", float: "right"}} onClick={handleLogout}>Logout</button>
      </div>
      {isLoading ? <div style={{
          height: "80vh",
          display: 'flex',
          justifyContent: "center",
          alignItems: "center"
        }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> : <>
        <div className='container'>
          <h2 className='mt-4'>Welcome <br/><span className='text-primary'>{userName}</span></h2>
          <p className='text-primary'>{userEmail}</p>
        </div>
        <div className='container'>
          <div className="row">
            <div className="col-md-4">
              <div className="d-grid gap-2 my-4">
                <Link to={"/add-new-note"} className="btn btn-outline-dark" type="button" style={{
                  borderRadius: "50px"
                }}>Add New Note</Link>
              </div>
            </div>
            <div className="col-md-8">
              {notes.map(note => {
                return (
                  <div key={note.id} className="card mb-2" style={{
                    borderTopRightRadius: "50px",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "50px",
                    borderBottomRightRadius: "0px",
                    maxWidth: "30rem"
                  }}>
                    <div className="card-body">
                      <div className='text-truncate' style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: note.note }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* <div className="col-md-2"></div> */}
          </div>
        </div>
      </>}
    </>
  )
}

export default Home