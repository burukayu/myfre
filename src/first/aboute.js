import React, { useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePhoto from '../assets/ayenew.jpg'; // Make sure you have this photo in the same folder

function About() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (Date.now() - user.time > 5 * 60 * 1000) {
        localStorage.removeItem("user");
        window.location.href = ('http://localhost:3000/');
      }
    } else {
      window.location.href = ('http://localhost:3000/');
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 border-0">
        <div className="row g-4 align-items-center">
          <div className="col-md-4 text-center">
            <img
              src={profilePhoto}
              alt="Ayenew B."
              className="img-fluid rounded-circle border border-3"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-8">
            <h2 className="mb-3">Ayenew B.</h2>
            <p><strong>Full Stack Developer</strong></p>
            <p><i className="bi bi-envelope"></i> buruksw@gmail.com</p>
            <p><i className="bi bi-telephone"></i> +251 915 292 687</p>
            {/* <p>Welcome to my application! I specialize in developing full-stack solutions that are scalable and user-friendly.</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
