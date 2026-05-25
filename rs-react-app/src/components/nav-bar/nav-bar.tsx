import { Link } from 'react-router-dom';
import './nav-bar.css';
import { useTheme } from '../../context/use-theme';

export default function NavigationBar() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const themeIcon = theme === 'light' ? '☀' : '☾';

  return (
    <nav className="navigation-bar">
      <div className="navigation-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      <button
        aria-label={`Switch to ${nextTheme} theme`}
        className="theme-toggle"
        onClick={() => setTheme(nextTheme)}
        title={`Current theme: ${theme}`}
        type="button"
      >
        <span aria-hidden="true">{themeIcon}</span>
      </button>
    </nav>
  );
}
