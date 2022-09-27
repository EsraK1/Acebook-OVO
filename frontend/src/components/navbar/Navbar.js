import './Navbar.css'
import React, { useEffect, useState } from 'react';


export default function Navbar() {
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const logout = () => {
        window.localStorage.removeItem("token")
        // navigate('/login')
      }

    if (token) {
        return (
            <nav className="navbar">
                <div className="brand-title">Acebook - OVO</div>
                <div className="navbar-links">
                    <ul>
                        <li><a href="/login" onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="navbar">
                <div className="brand-title">Acebook - OVO</div>
                <div className="navbar-links">
                    <ul>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Signup</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

