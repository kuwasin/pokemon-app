import React from 'react'
import Search from '../Search/Search';
import "./Navbar.css"
function Navbar({handleChange,value}) {
 
  
  

  
  return (
    <nav>
      <h2>ポケモン図鑑</h2>
      <Search handleChange={handleChange} value = {value} />
    </nav>
  );
}

export default Navbar
