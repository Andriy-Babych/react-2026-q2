import './about-page.css';

export default function AboutPage() {
  return (
    <div className="about_page-container">

      <h1>About This Project</h1>

      <h3 className='author'>Author: <span>Andriy Babych</span></h3>

      <p className='description'>This application was created as part of the RS School React course.<br />
        The project demonstrates React Hooks, React Router, API integration,
        pagination, and modern SPA architecture.
      </p>

      <p className='description'>The application allows users to search Star Trek food items using the STAPI API and explore results in a user-friendly interface.
      </p>

      <p className='description'><a className='course-link' href="https://app.rs.school/course/stats?course=react-2026-q2" target="_blank" rel="noopener noreferrer">RS School React Course </a>
      </p>
    </div>
  );
}