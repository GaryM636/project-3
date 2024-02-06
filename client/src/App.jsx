import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AsideMenu from './Components/Aside/AsideMenu';
import Home from './Pages/Home';
import Discover from './Pages/Page';
import Trends from './Components/Trends/Trends';
import './main.css';
import Images from './Components/Images/ProfileImages'

function App() {
  return (
    <>
      <Router>
        <div className="spacer">
          <div className="aside-menu">
            <AsideMenu />
          </div>
          <div className='center-section'>
            <Routes>
              <Route path="/profile" element={<Images />} />
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
            </Routes>
          </div>
          <div className="trends-section">
            <Trends />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
