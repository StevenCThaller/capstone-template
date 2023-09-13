import React from 'react';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Homepage</a></li>
        <li><a href="/forum">General Forum</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
