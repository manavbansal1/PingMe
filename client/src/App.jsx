import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { MessageSquare, MessageCircle, User, LogOut } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomePage from "./Pages/HomePage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";

const App = () => {
  
  // Get the states from zustand 
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="app-container">
      {/* Top Branding - Show on all pages */}
      <div className="top-branding">
        <div className="brand-logo">
          <div className="brand-icon">
            <MessageSquare />
          </div>
          <h1 className="brand-text">PingMe</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          {/* Conditional renderingh if the user is authenticated */}
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />}/>
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      {/* Conditional renderingh if the user is authenticated */}
      {authUser && !isAuthPage && <BottomNavigation />}
    </div>
  );
};

const BottomNavigation = () => {
  const { logout } = useAuthStore();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bottom-nav">
      <div className="nav-items">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <MessageCircle /><span>Chat</span>
        </Link>
        
        <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`} >
          <User /><span>Profile</span>
        </Link>
        
        <button onClick={handleLogout} className="nav-item">
          <LogOut /><span>Logout</span>
          </button>
      </div>
    </div>
  );
};

export default App;