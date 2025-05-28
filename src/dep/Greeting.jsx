// Greeting.js
import React from 'react';

const Greeting = ({ name, age }) => {
    return (<div><h1>Hello, {name}!</h1>
         <div> Age: {age}</div></div>
  );
};

export default Greeting;
