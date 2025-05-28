// Counter.js
import React, { useState, useEffect } from 'react';

const Counter = ({num}) => {
  const [count1, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${num}`;
  }, [num]);

  return (
    <div>
      <h2>Counter: {num}</h2>
      <button onClick={() => setCount(count1 + 1)}>Increase</button>
    </div>
  );
};

export default Counter;
