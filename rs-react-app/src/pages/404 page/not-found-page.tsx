import { Link } from 'react-router-dom';
import './not-found-page.css';

export default function NotFoundPage() {
  return (
    <div className="notFoundPage">
      <h1>404</h1>
      <p>Oops...<br />The page you are looking for does not exist.</p>
      <Link to="/" className='back_home-button'> Go Back</Link>
    </div>
  );
}