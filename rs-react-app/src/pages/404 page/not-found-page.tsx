import { Link } from 'react-router-dom';
import './not-found-page.css';

export default function NotFoundPage() {
  return (
    <div className="notFoundPage">
      <h1>404</h1>
      <p>Opsss...<br />The page you are looking for does not exist.</p>
      <button className='back_home-button'><Link to="/"> Go Back</Link></button>
    </div>
  );
}