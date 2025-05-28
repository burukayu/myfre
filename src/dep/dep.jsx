// App.js
import React, { useState, useEffect } from 'react';
import Greeting from './Greeting';
import Counter from './Counter';

const Dep = () => {
  const [name, setName] = useState('Alice');
    let [age, setAge] = useState(25);
    const [num, setNum] = useState(0);
  useEffect(() => {
    console.log(`Welcome ${name}!`);
  }, [name]);
const nameAndAge = () => {
    setName(name === 'Alice' ? 'Bob' : 'Alice')
    setAge(age+=1);
  };
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Greeting name={name} age={age} />
      <Counter num={num} />
      <br />
      <button onClick={() => nameAndAge() }>
        Change Name
          </button>
          <button onClick={() => setNum(age +=1)}>
        Change numm</button>
    </div>
  );
};

export default Dep;
