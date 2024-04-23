import "./static/about.css";
import './static/font.css';
import './static/index.css';
import { Routes, Route } from 'react-router-dom';

import About from './components/About';
import Demo from './components/Demo';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
