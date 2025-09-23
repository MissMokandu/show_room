import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <h2>Car Showroom</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cars">Browse Cars</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;