import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../Components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import '../CSS/LoginPage.css'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Side - Form */}
        <div className="login-form-section">
          <div className="login-form-container">

            <div className="welcome-section">
              <div className="welcome-icon">
                <MessageSquare />
              </div>
              <h1 className="welcome-title">Welcome Back</h1>
              <p className="welcome-subtitle">Sign in to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <div className="input-icon"><Mail size={20} /></div>
                  <input type="email" className="form-input" placeholder="you@example.com" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <div className="input-icon"><Lock size={20} /></div>
                  <input type={showPassword ? "text" : "password"} className="form-input" placeholder="••••••••" value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} required
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-button" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    {/* Used the loading spinner from github */}
                    <div className="loading-spinner"></div>
                    Loading...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account?{" "} <Link to="/signup" className="auth-link">Create account </Link></p>
            </div>
          </div>
        </div>

      {/* Right Side - Image/Pattern: taken from github and modified a bit*/}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
    </div>
  );
};
export default LoginPage;