import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    
     <div className='countainer'>
  <Link to='/CreateUser'> 
      <h1>createUser</h1>
  </Link>
 
   </div>  
  
  )
}

