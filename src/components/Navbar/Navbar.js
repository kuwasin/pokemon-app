import React from 'react'
import Search from '../Search/Search';
import "./Navbar.css"
function Navbar({handleChange}) {
 
  
  

  
  return (
    <nav>
      <h2>ポケモン図鑑</h2>
      <Search handleChange={handleChange} />
    </nav>
  );
}

export default Navbar
