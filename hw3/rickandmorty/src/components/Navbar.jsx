import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Rick and Morty Explorer</h2>

      <div className="nav-links">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/characters">Characters</NavLink>
        <NavLink to="/species">Species</NavLink>
        <NavLink to="/locations">Locations</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
