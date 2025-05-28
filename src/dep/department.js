import React,{ useState,useEffect } from "react"; 
function Department() {
    const [department, setDepartment] = useState([]);
    const [formData, setFormData] = useState({  Name: '', Email: '', phone: '',SecondName: '' });
    const [showPopup, setShowPopup] = useState(false);
    const [showaddPopup, setShowaddPopup] = useState(false);
    const getdepar = () => {
        fetch('http://localhost:3000/user/user/register')
            .then(res => res.json())
            .then(data => setDepartment(data))
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getdepar();
    }, []);
   const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete this department?`)) {
            fetch(`http://localhost:3000/user/user/register/${id}`, {
                method: 'DELETE',
            })
                .then(res => {
                    if (!res.ok) throw new Error('Failed to delete department');
                    return res.text();
                })
                .then(() => {
                    alert(`Deleted department`);
                    getdepar();
                })
                .catch(err => {
                    console.error(err);
                    alert('Error deleting department');
                });
        }
    }
    const add = () => {
        setShowaddPopup(true);
    }
    const openUpdatePopup = (dep) => {
        console.log(dep);
        setFormData(dep); // prefill form with selected employee data
       setShowPopup(true);
    }
     const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/user/user/register/${formData.Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to update department');
                return res.json();
            })
            .then(() => {
                alert(`Updated department`);
                getdepar();
                setShowPopup(false);
            })
            .catch(err => {
                console.error(err);
                alert('Error updating department');
            });
    }
    const handleAdd = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/user/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to add department');
                return res.json();
            })
            .then(() => {
              console.log(`added department` );
                
              
                getdepar();
                setShowaddPopup(false);
            })
            .catch(err => {
                console.error(err);
                alert('Error adding department');
            });
    }
    return (
        <div className="container mt-4">
            <h1>Employee List</h1> 
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th> ID</th>
                        <th> Name</th>
                        <th> Second Name</th>
                        <th> Phone</th>
                        <th> Email</th>
                        <th> Salary</th>
                        <th><button class="btn btn-primary" onClick={()=>add()}>Add+</button></th>
                    </tr>
                </thead>
                <tbody>
                    {department.map((dep) => (
                        <tr key={dep.Id}>
                            <td>{dep.Id}</td>
                            <td>{dep.Name}</td>
                            <td>{dep.SecondName}</td>
                            <td>{dep.Phone}</td>
                            <td>{dep.Email}</td>
                            <td>{dep.Salary}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => openUpdatePopup(dep)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(dep.Id)}>Delete</button>
                                </td>
                        </tr>

                    ))}
                    
                </tbody>    
            </table>
            {}
            {showPopup && (
              <div style={popupStyles.overlay}>
               <div style={popupStyles.popup}>
                    <h2>Update Department</h2>
                    <form onSubmit={handleUpdate}>
                        <label>
                            ID:
                            <input type="text" name="Id" value={formData.Id} onChange={handleChange} readOnly />
                        </label>
                        <label>
                            Name:
                            <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
                            </label>
                            <label>
                            SecondName:
                            <input type="text" name="SecondName" value={formData.SecondName} onChange={handleChange} />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="Email" value={formData.Email} onChange={handleChange} />
                            </label>
                            <label>
                            phone:
                            <input type="text" name="Phone" value={formData.Phone} onChange={handleChange} />
                        </label>
                        <button type="submit">Update</button>
                        <button type="button" onClick={() => setShowPopup(false)}>Close</button>
                    </form>
                    </div>
                    </div>
            )}
            {showaddPopup && (
                <div style={popupStyles.overlay}>
                 <div style={popupStyles.popup}>
                        <h2>Add Department</h2>
                        <form onSubmit={handleAdd}>
                            <label>
                                ID:
                                <input type="text" name="id" value={formData.id} onChange={handleChange} />
                            </label>
                            <label>
                                Name:
                                <input type="text" name="username" value={formData.username} onChange={handleChange} />
                            </label>
                            <label>
                                Location:
                                <input type="text" name="SecondName" value={formData.SecondName} onChange={handleChange} />
                            </label>
                            <label>
                                Phone:
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />   
                            </label>
                            <label>
                                Email:
                                <input type="email" name="Email" value={formData.Email} onChange={handleChange} />
                            </label>
                            <button type="submit">Add</button>
                            <button type="button" onClick={() => setShowaddPopup(false)}>Close</button>
                        </form>
                        </div>
                        </div>
                   )}
        </div>
    )
}
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

export default Department;