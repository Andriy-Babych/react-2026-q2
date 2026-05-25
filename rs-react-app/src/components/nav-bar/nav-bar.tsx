import { Link } from 'react-router-dom';
import './nav-bar.css';
import { useTheme } from '../../context/use-theme';

export default function NavigationBar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="navigation-bar">
      <div className="navigation-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      <label className="theme-selector">
        <span>Theme</span>
        <select
          aria-label="Theme"
          value={theme}
          onChange={(event) =>
            setTheme(event.target.value === 'dark' ? 'dark' : 'light')
          }
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </nav>
  );
}
