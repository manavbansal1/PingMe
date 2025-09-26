import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import '../CSS/SignUpPage.css';

const SignUpPage = () => {
  const { signup, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return toast.error("Full Name is required");
    }
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Email is invalid");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid === true) {
      signup(formData);
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-container">

        {/* Left Side - Form */}
        <div className="signup-form-section">
          <div className="signup-form-container">
            
            {/* Logo Section */}
            <div className="logo-section">
              <div className="logo-container">
                <div className="logo-icon-wrapper">
                  <div className="logo-main-icon">
                    <MessageSquare />
                  </div>
                  <div className="logo-accent">✨</div>
                </div>
                <div>
                  <h1 className="logo-title">Create Account</h1>
                  <p className="logo-subtitle">Get started with your free account</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-group">
                  <div className="input-icon"><User size={20} /></div>
                  <input type="text" className="form-input" placeholder="John Doe" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required/>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <div className="input-icon"><Mail size={20} /></div>
                  <input type="email" className="form-input" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required/>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <div className="input-icon">
                    <Lock size={20} />
                  </div>
                  <input type={showPassword ? "text" : "password"} className="form-input" placeholder="••••••••"
                    value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="password-hint">Must be at least 6 characters</div>
              </div>

              <button type="submit" className="submit-button" disabled={isSigningUp}>
                {isSigningUp ? (
                  <>
                    <div className="loading-spinner"></div>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p> Already have an account?{" "}<Link to="/login" className="auth-link">Sign in</Link></p>
            </div>
          </div>
        </div>

        {/* Right Side - Pattern */}
        <div className="pattern-section">
          <div className="pattern-content">
            <h2 className="pattern-title">Join our community</h2>
            <p className="pattern-subtitle">
              Connect with friends, share moments, and stay in touch with your loved ones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;