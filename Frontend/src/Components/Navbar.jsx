import React from "react";
import Logo from '../assets/logo.svg'
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="shadow-lg bg-transparent m-2 rounded-lg">
      <ul className="flex justify-evenly rounded-md items-center p-1">
    <img src={Logo} alt="logo" loading="lazy" width={90} height={30}/>
        <li  className=" relative">
          <NavLink to="/" className=' inline-block'>Home</NavLink>
        </li>
        <li className="relative">
          <NavLink to="/contact" className=" inline-block" >Contact</NavLink>
        </li>
        <li className="relative">
          <NavLink to="/about" className='inline-block' >About</NavLink>
        </li>
      </ul>
    </nav>
  );
} 

export default Navbar;
