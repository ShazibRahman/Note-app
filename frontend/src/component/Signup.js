import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Signup() {
    let history = useNavigate()
    const [credential, setCredential] = useState({ name: "", email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(credential);
        const response = await fetch("http://localhost:4000/api/auth/createuser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
        });
        const json = await response.json()
        if (response.status === 200) {
            localStorage.setItem('token', json.authToken)
            history("/login")
        }
        else {
            alert(json)

        }



    }
    const onChange = (e) => {
        console.log(e.target.value);
        setCredential({ ...credential, [e.target.name]: e.target.value })
        console.log(credential);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="name" className="form-control" id="name" name='name' onChange={onChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
