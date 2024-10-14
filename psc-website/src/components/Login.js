import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        const userId = sessionStorage.getItem('userId');
        const loginTime = sessionStorage.getItem('loginTime');

        if (userId && loginTime) {
            const currentTime = new Date().getTime();
            const sessionDuration = 60 * 60 * 1000; // 1 hour in milliseconds

            if (currentTime - loginTime < sessionDuration) {
                console.log('User is still logged in');
            } else {
                // Clear session if expired
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('loginTime');
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('role');
            }
        }
    }, []);

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create the request body
        const requestBody = {
            studentId: username,   // Assuming `username` is your studentId
            identification: password  // Assuming `password` is your identification
        };
    
        try {
            // Call the real API with a POST request
            const response = await fetch('http://localhost:5000/student/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),  // Convert the request body to a JSON string
            });
    
            // Parse the JSON response
            const data = await response.json();
    
            // Check if login is successful
            if (response.ok) {
                // Save user ID, username, and role in sessionStorage
                sessionStorage.setItem('userId', data.studentId);
                sessionStorage.setItem('loginTime', new Date().getTime());
                sessionStorage.setItem('username', data.name + ' ' + data.lastname); // Combining first and last name
                sessionStorage.setItem('role', data.role);
    
                console.log('User logged in successfully:', data.studentId);
    
                // Redirect to home or another page
                navigate('/');
            } else {
                // Handle login failure
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    return (
        <section className="vh-100 w3-light-grey">
            <div className="container d-flex justify-content-center align-items-center h-100">
                <div className="col-sm-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="InputUsername1">Username</label>
                            <input
                                className="form-control"
                                id="InputUsername1"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="InputPassword1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="Check1"
                                checked={rememberMe}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="Check1">Remember Me</label>
                        </div>
                        <button type="submit" className="btn btn-primary col-sm-12">Login</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
