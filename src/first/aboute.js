// import logo from './logo.svg';
import '../App.css';
import React, { useEffect, useState } from 'react';
function About() {

   const [message, setEmployees] = useState([]);

 const abc = (emp) => {
  fetch('https://localhost:7242/api/Employee/' + emp.id, {
    method: 'DELETE'
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete employee');
      }
      return res.json(); // Optional: if your API returns a response body
    })
    .then(data => {
      alert(`Deleted employee ${emp.name}`);
      // Optionally refresh list or update UI here
    })
    .catch(err => {
      console.error(err);
      alert('Error deleting employee');
    });
};
// const updateEmployee = (employee) => {
//   fetch(`https://localhost:7242/api/Employee/${employee.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(employee)
//   })
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('Failed to update employee');
//       }
//       return res.json(); // or res.text() depending on your API
//     })
//     .then(data => {
//       alert(`Updated employee: ${data.name}`);
//       // Optionally update local state here
//     })
//     .catch(err => {
//       console.error(err);
//       alert('Error updating employee');
//     });
// };

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
    fetch('http://localhost/MyAPI/api/Employee/')  // your C# API endpoint
        .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error(err));
  }, []);
const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
     fetch(`https://localhost:7242/api/Employee/${e.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(e)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update employee');
      }
      return res.json(); // or res.text() depending on your API
    })
    .then(data => {
      alert(`Updated employee: ${data.name}`);
      // Optionally update local state here
    })
    .catch(err => {
      console.error(err);
      alert('Error updating employee');
    });
    setShowPopup(false); // Close popup after submit
  };
 <form onSubmit={handleSubmit}>
      <h2>React Form</h2>

      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />

      <label>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee List</h1>  
        <table border="1">
          <thead>
            <tr>
             <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th></tr>
          </thead>
          <tbody>
          {message.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.phone}</td>
              <td>{emp.email}</td>
              <td>
                <button onClick={() => setShowPopup(true)}>Edit</button>
                <button onClick={() => abc(emp)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        <div>
        
        </div>
        
      </header>
          <div>
      {/* <button onClick={() => setShowPopup(true)}>Open Form</button> */}

      {showPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2>React Form</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              <br />
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
              <br />
              <label>
                Phone:
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </label>
              <br />
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowPopup(false)} style={{ marginLeft: 10 }}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
}
const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
  },
  popup: {
    backgroundColor: 'white', padding: '20px', borderRadius: '10px',
    minWidth: '300px', boxShadow: '0 0 10px rgba(0,0,0,0.3)'
  }
};
export default About;
