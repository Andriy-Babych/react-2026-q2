import { Link } from "react-router-dom";
import './nav-bar.css';

export default function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}