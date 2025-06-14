import logo from "../assets/logo.png";

function MyApp() {
  return (
    <div className="container">
      <h1> <img
        src={logo}
        alt="User profile icon"
        width="24"
        height="24"
        className="me-2"
      />Welcome</h1>
      <p > <img
        src={logo}
        alt="User profile icon"
        width="24"
        height="24"
        className="me-2"
      />A simple and easy application.</p>
      <p> <img
        src={logo}
        alt="User profile icon"
        width="24"
        height="24"
        className="me-2"
      />Use the navigation links to explore different sections.</p>
      
    </div>
  );
}

export default MyApp;
