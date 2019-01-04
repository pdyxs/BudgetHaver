import React from "react";
import './App.scss';
import MainDisplay from './MainDisplay';
import Menu from './Menu';
import CurrentPage from './Pages/CurrentPage';

const App = () => (
  <div className="container">
    <div className="text-center">
      <h1 className="text-small text-muted my-3">
        Budget Haver
      </h1>
      <MainDisplay />
    </div>
    <Menu />
    <CurrentPage />
    <footer className="footer fixed-bottom pb-2">
      <div className="container text-right">
        <span className="small text-muted">v{APP_VERSION_NUMBER}, built on {BUILD_DATE} at {BUILD_TIMESTAMP} (UTC)</span>
      </div>
    </footer>
  </div>
);

export default App;
