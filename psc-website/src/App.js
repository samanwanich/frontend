import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout'; // Your layout with navbar and sidebar
import Login from './components/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />  {/* Login doesn't use Layout */}

        {/* Routes that require authentication */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="home" element={<Home />} /> {/* Home rendered inside Layout */}
          {/* Add more child routes */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
