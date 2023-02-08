import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


export default function NavBar() {
    let location = useLocation()
    let navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        navigate("/login")


    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("token") ? <form className="d-flex" >
                            <Link to="/login" className="btn btn-primary mx-2" role="button">Login</Link>
                            <Link to="/signup" className="btn btn-primary mx-2" role="button">SignUp</Link>
                        </form> : <button className='btn btn-primary' onClick={logout}>Logout </button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
