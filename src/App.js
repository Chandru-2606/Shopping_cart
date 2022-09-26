import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Dashboard from './Dashboard/dashboard'; 
import Cart from './Cart/cart';

function App() {
  return (
    <Router>
         
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Cart" element={<Cart />} />

    

      </Routes>
      
    </Router>
  );
}

export default App;
