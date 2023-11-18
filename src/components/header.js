import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className="menu"><h1>REACT POKEAPP</h1></Link>
      </nav>
    </header>
  );
}

export default Header;
