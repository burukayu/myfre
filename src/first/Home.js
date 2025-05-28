import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Home() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ Id: '', Name: '',SecondName:'',Salary:0,DpId:0, Email: '', Phone: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupforadd, setshowPopupforadd] = useState(false)
  const [addform, setAddform]=useState({name :'', secondname:'',phone:'',email:'',salary:0, dpid:0})
  const getUsers = () => {
    fetch(`http://localhost:3200/employee/employee` )
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error(err));
  };


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
if (user) {
 if(Date.now()-user.time > 5 * 60*1000) {
   localStorage.removeItem("user");
   window.location.href = ('http://localhost:3000/')
 }
} else {
  window.location.href = ('http://localhost:3000/')
}
    getUsers();
  }, []);

  const Add = () => {
    setshowPopupforadd(true)
    console.log(showPopupforadd,'gsdgsgdgg')
  }
  const deleteEmp = (emp) => {
    if (window.confirm(`Are you sure you want to delete ${emp.fullname}?`)) {
      fetch(`http://localhost:3200/employee/employee/${emp.id}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to delete employee');
          return res.text();
        })
        .then(() => {
          alert(`Deleted employee ${emp.fullname}`);
          getUsers();
        })
        .catch(err => {
          console.error(err);
          alert('Error deleting employee');
        });
    }
  };

  const openUpdatePopup = (emp) => {
    debugger
    fetch(`http://localhost:3200/employee/employeeByid/${emp.id}`, {
      method: 'GET',
      
    }).then(res => res.json())
      .then(data=> setFormData(data[0]))
      .catch(err => console.log(err));
    debugger
      console.log(formData)
   // setFormData(emp); // prefill form with selected employee data
    setShowPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
   const handleChangeadd = (e) => {
    const { name, value } = e.target;
    setAddform(prev => ({ ...prev, [name]: value }));
  };
  const handleChangeid = (e) => {
     debugger
     const { name, value } = e.target;
    //  if (value == 0) {
    //    e.target.value=''
    //  }
    setAddform(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3200/employee/employeeByname/${formData.Name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update employee');
       return res.json();
      })
      .then(() => {
       // toast.warn('Employee updated successfully');
        getUsers();
        setShowPopup(false);
      })
      .catch(err => {
        console.error(err);
        alert('Error updating employee');
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    fetch("http://localhost:3200/employee/employeeByname",{
      method : "POST",
        headers: {
        'content-Type':'application/json'
      },
      body: JSON.stringify(addform)
    }).then(res => {
      if (!res.ok) {
        // throw new Error("Failed to add")
         toast.error("Failed to add.");
      }
      return res.json
    }).then(()=> {
      toast.success("added succesfully");
      getUsers();
      setshowPopupforadd(false)
    }).catch(err => {
       toast.error("Failed to add.");
        console.log(err)
    })
      
  }
  return (
    <div className="container mt-4">
      <h2>Employee List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th><button type="button" class=" btn btn-primary" onClick={()=>Add()} >Add+</button></th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.fullname}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>
                <button type="button" className="btn btn-danger me-2" onClick={() => deleteEmp(emp)}>Delete</button>
                <button type="button" className="btn btn-primary" onClick={() => openUpdatePopup(emp)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Form */}
      {showPopup && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.popup}>
            <h3>Update Employee</h3>
            <form onSubmit={handleUpdate}>
              <label>Name:</label>
              <input type="text" name="Name" value={formData.Name} onChange={handleChange} className="form-control" />
              <br />
          
            <label>Second Name:</label>
              <input type="text" name="SecondName" value={formData.SecondName} onChange={handleChange} className="form-control" />
              <br />

              <label>Email:</label>
              <input type="email" name="Email" value={formData.Email} onChange={handleChange} className="form-control" />
              <br />

              <label>Phone:</label>
              <input type="text" name="Phone" value={formData.Phone} onChange={handleChange} className="form-control" />
              <br />
                <label>Salary:</label>
              <input type="text" name="Salary" value={formData.Salary} onChange={handleChange} className="form-control" />
              <br />
              <label>Dept Id:</label>
              <input type="text" name="DpId" value={formData.DpId} onChange={handleChange} className="form-control" />
              <br />

              <button type="submit" className="btn btn-success">Update</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
{}
      {showPopupforadd && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.popup}>
            <h3>Update Employee</h3>
            <form onSubmit={handleAdd}>
              <label>Name:</label>
              <input type="text" name="name" value={addform.name} onChange={handleChangeadd} className="form-control" />
              <br />
              <label>Second Name:</label>
              <input type="text" name="secondname" value={addform.secondname} onChange={handleChangeadd} className="form-control" />
              <br />
              <label>Email:</label>
              <input type="email" name="email" value={addform.email} onChange={handleChangeadd} className="form-control" />
              <br />

              <label>Phone:</label>
              <input type="text" name="phone" value={addform.phone} onChange={handleChangeadd} className="form-control" />
              <br />

              <label>Salary:</label>
              <input type="text" name="salary" value={addform.salary} onChange={handleChangeadd} className="form-control" />
              <br /><label>Name:</label>
              <input type="text" name="dpid" value={addform.dpid} onChange={handleChangeid} className="form-control" />
              <br />
              <button type="submit" className="btn btn-success">Add</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setshowPopupforadd(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      
  <ToastContainer position="bottom-right " />
    </div>
  );
}

// Simple inline CSS for popup
const popupStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 999
  },
  popup: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '600px',
    boxShadow: '0 0 10px rgba(0,0,0,0.25)'
  }
};

export default Home;
