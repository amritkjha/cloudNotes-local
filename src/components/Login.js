import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [ credentials, setCredentials] = useState({email: "", password: ""});
    let history = useHistory();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.success) {
          localStorage.setItem('token', json.authToken);
          history.push('/')
        }
        else {
            alert("Wrong credentials")
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp" 
            defaultValue={credentials.email} 
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password" 
            defaultValue={credentials.password} 
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
