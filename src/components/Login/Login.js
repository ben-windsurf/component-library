import React, { useState } from 'react';
import './Login.css';

const Login = ({
  logo,
  brandName = "StubHub",
  themeColor = "#684cbc",
  onSubmit,
  onForgotPassword,
  socialLogins = [],
  showEmailCode = false,
  showCreateAccount = true,
  onCreateAccount,
  loading = false,
  errorMessage = ""
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && onSubmit) {
      onSubmit({ email, password, stayLoggedIn });
    }
  };

  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  const handleCreateAccount = () => {
    if (onCreateAccount) {
      onCreateAccount();
    }
  };

  return (
    <div className="login-app" style={{ '--theme-color': themeColor, '--brand-color': themeColor }}>
      <div className="login-container">
        {logo && (
          <div className="logo-container">
            <img src={logo} alt={brandName} className="logo" />
          </div>
        )}
        
        <h1 className="login-title">Sign in to {brandName}</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          
          <div className="checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={stayLoggedIn}
                onChange={(e) => setStayLoggedIn(e.target.checked)}
                className="checkbox"
              />
              Stay logged in
            </label>
            {onForgotPassword && (
              <button type="button" className="forgot-password" onClick={handleForgotPassword}>
                Forgot Password
              </button>
            )}
          </div>
          
          <button
            type="submit"
            className={`sign-in-btn ${!isFormValid ? 'disabled' : ''}`}
            disabled={!isFormValid || loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        {showEmailCode && (
          <button className="email-code-btn">
            Sign in with Email Code
          </button>
        )}
        
        {socialLogins.length > 0 && (
          <div className="social-login">
            {socialLogins.map((social, index) => (
              <button
                key={index}
                type="button"
                className={`${social.type}-btn social-btn`}
                onClick={social.onLogin}
              >
                {social.icon && <img src={social.icon} alt={social.type} className="social-icon" />}
                {social.type === 'facebook' && 'Log in with Facebook'}
                {social.type === 'apple' && 'Sign in with Apple'}
                {social.type === 'google' && 'Sign in with Google'}
              </button>
            ))}
          </div>
        )}
        
        {showCreateAccount && onCreateAccount && (
          <div className="create-account">
            <span>New to {brandName}? </span>
            <button type="button" className="create-account-link" onClick={handleCreateAccount}>
              Create account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
