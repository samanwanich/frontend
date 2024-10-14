export const isLoggedIn = () => {
    const userId = sessionStorage.getItem('userId');
    const loginTime = sessionStorage.getItem('loginTime');

    if (userId && loginTime) {
        const currentTime = new Date().getTime();
        const sessionDuration = 60 * 60 * 1000; // 1 hour in milliseconds

        // Check if the session is still valid
        if (currentTime - loginTime < sessionDuration) {
            return true; // User is logged in
        } else {
            // Clear session if expired
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('loginTime');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('role');
            return false; // Session expired
        }
    }
    return false; // Not logged in
};
