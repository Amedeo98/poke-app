import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Header() {
  return (
    <header>
      <h1>REACT POKEAPP</h1>
      <nav>
        <Link to="/" className="menu">Home</Link>
      </nav>
    </header>
  );
}

export default Header;
