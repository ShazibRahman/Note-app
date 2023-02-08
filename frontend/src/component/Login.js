import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const history = useNavigate()
    const [credential, setCredential] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const ip = process.env.REACT_APP_IP || 'localhost'
        console.log(ip)
        const response = await fetch(`http://${ip}:4000/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json()
        if (response.status === 200) {
            localStorage.setItem('token', json.authToken)
            history("/")
        }
        else {
            console.log("here");
            props.showAlert("invalid credential", 'warning')


        }



    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credential.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" id='password' name='password' value={credential.password} onChange={onChange} className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </div>
    )
}

export default Login
