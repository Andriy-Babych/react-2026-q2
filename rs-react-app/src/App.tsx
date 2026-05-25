import './App.css';
import { Route, Routes } from 'react-router-dom';

import NavigationBar from './components/nav-bar/nav-bar';
import SelectedItemsFlyout from './components/selected-items-flyout/selected-items-flyout';
import { ThemeProvider } from './context/theme-provider';

import HomePage from './pages/home-page/home-page';
import AboutPage from './pages/about-page/about-page';
import NotFoundPage from './pages/404 page/not-found-page';
import DetailsPage from './pages/details-page/details-page';

function App() {
  return (
    <ThemeProvider>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="details/:id" element={<DetailsPage />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <SelectedItemsFlyout />
    </ThemeProvider>
  );
}

export default App;
