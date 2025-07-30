import React, { useState } from 'react';
import './Login.css';

const Login = ({
  logo,
  brandName = 'StubHub',
  title,
  
  themeColor = '#684cbc',
  
  showEmailCode = true,
  showPrivacyNotice = false,
  
  socialLogins = {
    facebook: true,
    apple: true,
    google: true
  },
  
  facebookLogo,
  appleLogo,
  googleLogo,
  
  onSubmit,
  onForgotPassword,
  onCreateAccount,
  onEmailCode,
  onSocialLogin,
  
  privacyPolicyLink,
  loading = false,
  errorMessage = '',
  
  isTypeScript = false
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const isFormValid = email.trim() !== '' && password.trim() !== '';
  const displayTitle = title || `Sign in to ${brandName}`;

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

  const handleEmailCode = () => {
    if (onEmailCode) {
      onEmailCode();
    }
  };

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <div className="login-app" style={{ '--theme-color': themeColor }}>
      <div className="login-container">
        <div className="login-card">
          <div className="logo-container">
            <img src={logo} alt={brandName} className="login-logo" />
          </div>
          
          <h1 className="login-title">{displayTitle}</h1>
          
          <form onSubmit={handleSubmit} className="login-form">
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required={isTypeScript}
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required={isTypeScript}
              />
            </div>
            
            <div className="form-check-container">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="stayLoggedIn"
                  checked={stayLoggedIn}
                  onChange={(e) => setStayLoggedIn(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="stayLoggedIn">
                  Stay logged in
                </label>
              </div>
              <button 
                type="button" 
                className="forgot-password-link" 
                onClick={handleForgotPassword}
              >
                Forgot Password
              </button>
            </div>
            
            <button
              type="submit"
              className={`btn-signin ${!isFormValid || loading ? 'disabled' : ''}`}
              disabled={!isFormValid || loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            
            {showPrivacyNotice && privacyPolicyLink && (
              <div className="privacy-notice">
                By signing in or creating an account, you acknowledge and accept our{' '}
                <a href={privacyPolicyLink} className="privacy-link">privacy policy</a>
              </div>
            )}
          </form>
          
          {showEmailCode && (
            <button className="email-code-btn" onClick={handleEmailCode}>
              Sign in with Email Code
            </button>
          )}
          
          <div className="social-login">
            {socialLogins.facebook && facebookLogo && (
              <button 
                className="btn-facebook" 
                onClick={() => handleSocialLogin('facebook')}
              >
                <img src={facebookLogo} alt="Facebook" className="social-icon" />
                Log in with Facebook
              </button>
            )}
            
            {socialLogins.apple && appleLogo && (
              <button 
                className="btn-apple" 
                onClick={() => handleSocialLogin('apple')}
              >
                <img src={appleLogo} alt="Apple" className="social-icon" />
                Sign in with Apple
              </button>
            )}
            
            {socialLogins.google && googleLogo && (
              <button 
                className="btn-google" 
                onClick={() => handleSocialLogin('google')}
              >
                <img src={googleLogo} alt="Google" className="social-icon" />
                Sign in with Google
              </button>
            )}
          </div>
          
          <div className="create-account">
            <span>New to {brandName}? </span>
            <button 
              type="button" 
              className="create-account-link" 
              onClick={handleCreateAccount}
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
