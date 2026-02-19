import './App.css';
import Home from './screens/Home';
// import Modal from './components/Modal';
// import Login from './screens/Login';
import Data from './screens/Data';
import Success from './screens/Success';
import Cancel from './screens/Cancel';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/fetchdonations" element={<Data/>} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* <Route exact path="/login" element={<Login/>} /> */}
      </Routes>
    </div>
  </Router>

  );
}

export default App;
