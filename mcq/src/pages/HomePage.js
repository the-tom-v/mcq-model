import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
     
      <h1>Welcome to the Home Page</h1>
      <Link to="/App">
        <button>MCQ</button>
      </Link>
    </div>
  );
};

export default HomePage;
