import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  
  const { signup , isSigningUp } = useAuthStore();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ formData, setFormData ] = useState({
    fullName : '',
    email : '',
    password : '',
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

  // CSS-based icon components that will definitely render
  const UserIcon = () => (
    <div className="w-5 h-5 bg-base-content/40 group-focus-within:bg-primary transition-colors" 
         style={{
           maskImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' /%3e%3c/svg%3e")`,
           maskSize: 'contain',
           maskRepeat: 'no-repeat',
           maskPosition: 'center'
         }}>
    </div>
  );

  const MailIcon = () => (
    <div className="w-5 h-5 bg-base-content/40 group-focus-within:bg-primary transition-colors" 
         style={{
           maskImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75' /%3e%3c/svg%3e")`,
           maskSize: 'contain',
           maskRepeat: 'no-repeat',
           maskPosition: 'center'
         }}>
    </div>
  );

  const LockIcon = () => (
    <div className="w-5 h-5 bg-base-content/40 group-focus-within:bg-primary transition-colors" 
         style={{
           maskImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' /%3e%3c/svg%3e")`,
           maskSize: 'contain',
           maskRepeat: 'no-repeat',
           maskPosition: 'center'
         }}>
    </div>
  );

  const EyeIcon = () => (
    <div className="w-5 h-5 bg-base-content/40 hover:bg-primary transition-colors cursor-pointer" 
         style={{
           maskImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' /%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' /%3e%3c/svg%3e")`,
           maskSize: 'contain',
           maskRepeat: 'no-repeat',
           maskPosition: 'center'
         }}>
    </div>
  );

  const EyeOffIcon = () => (
    <div className="w-5 h-5 bg-base-content/40 hover:bg-primary transition-colors cursor-pointer" 
         style={{
           maskImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88' /%3e%3c/svg%3e")`,
           maskSize: 'contain',
           maskRepeat: 'no-repeat',
           maskPosition: 'center'
         }}>
    </div>
  );

  const MessageIcon = () => (
    <div className="w-8 h-8 bg-primary" 
         style={{
           maskImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z' /%3e%3c/svg%3e")`,
           maskSize: 'contain',
           maskRepeat: 'no-repeat',
           maskPosition: 'center'
         }}>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 pt-16">
      <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

        {/* left side */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
          <div className="w-full max-w-md space-y-8">
            
            {/* LOGO */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-4 group">
                <div className="relative">
                  <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                    <MessageIcon />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <div className="size-6 bg-accent rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-accent-content text-xs">✨</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-base-content mt-2">
                    Create Account
                  </h1>
                  <p className="text-base-content/70 mt-2">Get started with your free account</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-12 focus:input-primary bg-base-100/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MailIcon />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full pl-12 focus:input-primary bg-base-100/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockIcon />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-12 pr-12 focus:input-primary bg-base-100/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                <label className="label">
                  <span className="label-text-alt text-base-content/60">Must be at least 6 characters</span>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:transform-none" 
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="text-center pt-6 border-t border-base-300">
              <p className="text-base-content/60">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* right side */}
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </div>
  );
};

export default SignUpPage;