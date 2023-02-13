import React from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';

function Home() {
    let location = useLocation();
    let history = useHistory()
    const handlelogout = () => {
        localStorage.removeItem('token')
        history.push('/login')
    }
    return (
        <div className="">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand mx-2" to="/">CloudNotes</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                    </li>
                    </ul>
                </div>
                {!localStorage.getItem('token') ? 
                <div>
                    <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                </div>
                 : <button className="btn btn-primary mx-2" onClick={handlelogout}>Logout</button>}
            </nav>
        </div>
    )
}

export default Home;