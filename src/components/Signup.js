import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
    let history = useHistory();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://127.0.0.1:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
          localStorage.setItem('token', json.authToken);
          // console.log(json.authToken);
          history.push("/")
        }
        else {
            alert("Wrong credentials")
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp" 
            // value={credentials.email} 
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp" 
            // value={credentials.email} 
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password" 
            // value={credentials.password} 
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
