import React, { useState} from "react";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//import { useNavigate } from 'react-router-dom';
function Users() {
    
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "",password: "" });
    const [usersPopup, setUsersPopup] = useState(false);
    const createAccount = () => {
        setUsersPopup(true);
    };
    const [formUser, setFormUser] = useState({
    username: "",
    password: "",
    phone: "",
    email: ""
    });
    const createNow = () => {
        
//         const Username = document.getElementById("Username").value;
//         const Password = document.getElementById("Password").value;
//         const Phone = document.getElementById("Phone").value;
//         const Email = document.getElementById("Email").value;
// debugger
        if (!formUser.username || !formUser.password || !formUser.phone || !formUser.email) {
         toast.warn("Please fill in all fields.");
           debugger
        }
        else {

            fetch('http://localhost:3200/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formUser)
            })
                .then(res => res.json())
                .then(data => {

                    toast.success("Registered successfully.");
                    setUsersPopup(false);
                    setFormData(formUser);
                    login()
               window.location.href = ('http://localhost:3000/')
                })
                .catch(err => {
                    console.error(err);
                    toast.error("Error creating account.");
                });
        }
    };
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
    
      const handleChangec = (e) => {
    const { id, value } = e.target;
    setFormUser({ ...formUser, [id.toLowerCase()]: value });
  };
    const login = () => {
        console.log(formData);
        fetch('http://localhost:3200/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
        .then(data => {
            if (data && data.Userid) {
               // toast.success("Login successful.");
                // navigate('/home');
                const user = {
                    ...data,               // your user data
                    time: Date.now(),      // current timestamp
                    };
                localStorage.setItem("user", JSON.stringify(user)); 
                window.location.href = ('http://localhost:3000/home')
            } else {
                toast.error("Invalid username or password.");
            }
        }).catch(err => {
            console.error(err);
            toast.error("Error logging in.");
        });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" value={formData.username} onChange={handleChange} name="username" placeholder="Enter username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control"value={formData.password}  onChange={handleChange}name="password" placeholder="Enter password" />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-primary" onClick={()=>login()}>Login</button>
                        <button type="button" className="btn btn-secondary" onClick={()=>createAccount()}>Create Account</button>
                    </div>
                </form>
            </div>
            {usersPopup && (
                <div className="modal show justify-content-center align-items-center" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content d-flex justify-content-around">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Account</h5>
                                <button type="button" className="btn-close" onClick={() => setUsersPopup(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form >
                                           <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={formUser.username}
            onChange={handleChangec}
            placeholder="Enter username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={formUser.password}
            onChange={handleChangec}
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={formUser.phone}
            onChange={handleChangec}
            placeholder="Enter your Phone"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formUser.email}
            onChange={handleChangec}
            placeholder="Enter your Email"
          />
        </div>
                                    <button type="button" className="btn btn-primary center btn_self" onClick={()=>createNow()}>Create Account</button>
                                    <button type="button"  className="btn btn-primary btn_self"onClick={()=>setUsersPopup(false)}>Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <>
  {/* Your login form here */}
  <ToastContainer position="bottom-right " />
</>

        </div>
    );
}
// const styles = {
//     btn_self: {
        
//         display: "flex",
//         a: "center"
//     },
// }
export default Users;
