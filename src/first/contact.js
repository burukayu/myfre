import { useEffect } from "react";
function Contact() {
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
  return <h2>Home Page</h2>;
}
export default Contact;
