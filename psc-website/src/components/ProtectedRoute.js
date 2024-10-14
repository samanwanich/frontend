import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from './sessionUtils'; // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
    return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
