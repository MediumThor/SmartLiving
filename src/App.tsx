import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import About from './pages/About';
import Sailing from './pages/Sailing';
import Charters from './pages/Charters';
import Leadership from './pages/Leadership';
import Wellness from './pages/Wellness';
import Connect from './pages/Connect';
import Blog from './pages/Blog';
import Resources from './pages/Resources';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sailing" element={<Sailing />} />
            <Route path="/charters" element={<Charters />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
