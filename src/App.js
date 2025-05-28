import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './first/Home';
import About from './first/aboute';
import Contact from './first/contact';
import MyApp from './first/myApp';
import Users from './users/users';
import { useEffect, useState } from 'react';

function App() {
  const[loggein , setloggedin]=useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setloggedin(true)
      if (Date.now()-user.time > 5 * 60*1000) {
        localStorage.removeItem("user");
        setloggedin(false)
      }
      console.log("User is logged in:", user);
    } else {
      // User is not logged in, redirect to login page or show a message
      console.log("User is not logged in");
     //  window.location.href = ('http://localhost:3000/login');
    }
  },[]);
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              
              {loggein ? (
                <button className="nav-link" type='button' onClick={() => {
  localStorage.removeItem("user");
  setloggedin(false);
  window.location.href = ('http://localhost:3000/login');
  }}>
    <i className="bi bi-person-circle me-1"></i> Log out
  </button>
) : (
  <Link className="nav-link" to="/login">
    <i className="bi bi-person-circle me-1"></i> Login
  </Link>
)}
            </li> 
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<MyApp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
