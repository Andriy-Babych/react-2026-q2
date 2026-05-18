import './App.css';
import { Route, Routes } from 'react-router-dom';

import NavigationBar from './components/nav-bar/nav-bar';

import HomePage from './pages/home-page/home-page';
import AboutPage from './pages/about-page/about-page';
import NotFoundPage from './pages/404 page/not-found-page';

function App() {
  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes >
    </>
    
  );
}

export default App;
