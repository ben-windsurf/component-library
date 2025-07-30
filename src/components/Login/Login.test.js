import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    onForgotPassword: jest.fn(),
    onCreateAccount: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Login {...defaultProps} />);
      
      expect(screen.getByText('Sign in to StubHub')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByText('Stay logged in')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    });

    it('renders with custom brand name', () => {
      render(<Login {...defaultProps} brandName="CustomBrand" />);
      
      expect(screen.getByText('Sign in to CustomBrand')).toBeInTheDocument();
      expect(screen.getByText('New to CustomBrand?')).toBeInTheDocument();
    });

    it('renders with logo when provided', () => {
      const logoUrl = 'https://example.com/logo.png';
      render(<Login {...defaultProps} logo={logoUrl} brandName="TestBrand" />);
      
      const logoImg = screen.getByAltText('TestBrand');
      expect(logoImg).toBeInTheDocument();
      expect(logoImg).toHaveAttribute('src', logoUrl);
    });

    it('applies custom theme color', () => {
      const customColor = '#ff0000';
      render(<Login {...defaultProps} themeColor={customColor} />);
      
      const loginApp = document.querySelector('.login-app');
      expect(loginApp).toHaveStyle({
        '--theme-color': customColor,
        '--brand-color': customColor
      });
    });

    it('displays error message when provided', () => {
      const errorMessage = 'Invalid credentials';
      render(<Login {...defaultProps} errorMessage={errorMessage} />);
      
      const errorAlert = screen.getByRole('alert');
      expect(errorAlert).toBeInTheDocument();
      expect(errorAlert).toHaveTextContent(errorMessage);
    });
  });

  describe('Form Validation', () => {
    it('disables submit button when form is invalid', () => {
      render(<Login {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: 'Sign in' });
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveClass('disabled');
    });

    it('enables submit button when both email and password are provided', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign in' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      expect(submitButton).not.toBeDisabled();
      expect(submitButton).not.toHaveClass('disabled');
    });

    it('disables submit button when only email is provided', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const submitButton = screen.getByRole('button', { name: 'Sign in' });

      await user.type(emailInput, 'test@example.com');

      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveClass('disabled');
    });

    it('disables submit button when only password is provided', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign in' });

      await user.type(passwordInput, 'password123');

      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveClass('disabled');
    });
  });

  describe('User Interactions', () => {
    it('updates email input value when user types', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      await user.type(emailInput, 'test@example.com');

      expect(emailInput).toHaveValue('test@example.com');
    });

    it('updates password input value when user types', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const passwordInput = screen.getByPlaceholderText('Password');
      await user.type(passwordInput, 'password123');

      expect(passwordInput).toHaveValue('password123');
    });

    it('toggles stay logged in checkbox', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('calls onSubmit with correct data when form is submitted', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      render(<Login {...defaultProps} onSubmit={mockOnSubmit} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const checkbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: 'Sign in' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(checkbox);
      await user.click(submitButton);

      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        stayLoggedIn: true
      });
    });

    it('does not call onSubmit when form is invalid', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      render(<Login {...defaultProps} onSubmit={mockOnSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: 'Sign in' });
      await user.click(submitButton);

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('calls onForgotPassword when forgot password button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnForgotPassword = jest.fn();
      render(<Login {...defaultProps} onForgotPassword={mockOnForgotPassword} />);
      
      const forgotPasswordButton = screen.getByText('Forgot Password');
      await user.click(forgotPasswordButton);

      expect(mockOnForgotPassword).toHaveBeenCalled();
    });

    it('calls onCreateAccount when create account link is clicked', async () => {
      const user = userEvent.setup();
      const mockOnCreateAccount = jest.fn();
      render(<Login {...defaultProps} onCreateAccount={mockOnCreateAccount} />);
      
      const createAccountButton = screen.getByText('Create account');
      await user.click(createAccountButton);

      expect(mockOnCreateAccount).toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('shows loading text when loading is true', () => {
      render(<Login {...defaultProps} loading={true} />);
      
      expect(screen.getByText('Signing in...')).toBeInTheDocument();
      expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    });

    it('disables submit button when loading', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} loading={true} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: 'Signing in...' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      expect(submitButton).toBeDisabled();
    });
  });

  describe('Conditional Rendering', () => {
    it('does not render forgot password button when onForgotPassword is not provided', () => {
      render(<Login onSubmit={defaultProps.onSubmit} onCreateAccount={defaultProps.onCreateAccount} />);
      
      expect(screen.queryByText('Forgot Password')).not.toBeInTheDocument();
    });

    it('does not render create account section when showCreateAccount is false', () => {
      render(<Login {...defaultProps} showCreateAccount={false} />);
      
      expect(screen.queryByText('New to StubHub?')).not.toBeInTheDocument();
      expect(screen.queryByText('Create account')).not.toBeInTheDocument();
    });

    it('does not render create account section when onCreateAccount is not provided', () => {
      render(<Login onSubmit={defaultProps.onSubmit} onForgotPassword={defaultProps.onForgotPassword} />);
      
      expect(screen.queryByText('New to StubHub?')).not.toBeInTheDocument();
      expect(screen.queryByText('Create account')).not.toBeInTheDocument();
    });

    it('renders email code button when showEmailCode is true', () => {
      render(<Login {...defaultProps} showEmailCode={true} />);
      
      expect(screen.getByText('Sign in with Email Code')).toBeInTheDocument();
    });

    it('does not render email code button when showEmailCode is false', () => {
      render(<Login {...defaultProps} showEmailCode={false} />);
      
      expect(screen.queryByText('Sign in with Email Code')).not.toBeInTheDocument();
    });
  });

  describe('Social Login', () => {
    const socialLogins = [
      {
        type: 'facebook',
        icon: 'https://example.com/facebook-icon.png',
        onLogin: jest.fn()
      },
      {
        type: 'google',
        icon: 'https://example.com/google-icon.png',
        onLogin: jest.fn()
      },
      {
        type: 'apple',
        onLogin: jest.fn()
      }
    ];

    beforeEach(() => {
      socialLogins.forEach(social => social.onLogin.mockClear());
    });

    it('renders social login buttons when socialLogins are provided', () => {
      render(<Login {...defaultProps} socialLogins={socialLogins} />);
      
      expect(screen.getByText('Log in with Facebook')).toBeInTheDocument();
      expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
      expect(screen.getByText('Sign in with Apple')).toBeInTheDocument();
    });

    it('renders social login icons when provided', () => {
      render(<Login {...defaultProps} socialLogins={socialLogins} />);
      
      const facebookIcon = screen.getByAltText('facebook');
      const googleIcon = screen.getByAltText('google');
      
      expect(facebookIcon).toBeInTheDocument();
      expect(facebookIcon).toHaveAttribute('src', 'https://example.com/facebook-icon.png');
      expect(googleIcon).toBeInTheDocument();
      expect(googleIcon).toHaveAttribute('src', 'https://example.com/google-icon.png');
    });

    it('calls social login callbacks when buttons are clicked', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} socialLogins={socialLogins} />);
      
      const facebookButton = screen.getByText('Log in with Facebook');
      const googleButton = screen.getByText('Sign in with Google');
      const appleButton = screen.getByText('Sign in with Apple');

      await user.click(facebookButton);
      await user.click(googleButton);
      await user.click(appleButton);

      expect(socialLogins[0].onLogin).toHaveBeenCalled();
      expect(socialLogins[1].onLogin).toHaveBeenCalled();
      expect(socialLogins[2].onLogin).toHaveBeenCalled();
    });

    it('does not render social login section when no socialLogins provided', () => {
      render(<Login {...defaultProps} socialLogins={[]} />);
      
      expect(screen.queryByText('Log in with Facebook')).not.toBeInTheDocument();
      expect(screen.queryByText('Sign in with Google')).not.toBeInTheDocument();
      expect(screen.queryByText('Sign in with Apple')).not.toBeInTheDocument();
    });

    it('applies correct CSS classes to social login buttons', () => {
      render(<Login {...defaultProps} socialLogins={socialLogins} />);
      
      const facebookButton = screen.getByText('Log in with Facebook');
      const googleButton = screen.getByText('Sign in with Google');
      const appleButton = screen.getByText('Sign in with Apple');

      expect(facebookButton).toHaveClass('facebook-btn', 'social-btn');
      expect(googleButton).toHaveClass('google-btn', 'social-btn');
      expect(appleButton).toHaveClass('apple-btn', 'social-btn');
    });
  });

  describe('Accessibility', () => {
    it('has proper form structure with labels', () => {
      render(<Login {...defaultProps} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('required');
    });

    it('has proper ARIA attributes for error messages', () => {
      const errorMessage = 'Invalid credentials';
      render(<Login {...defaultProps} errorMessage={errorMessage} />);
      
      const errorAlert = screen.getByRole('alert');
      expect(errorAlert).toBeInTheDocument();
      expect(errorAlert).toHaveTextContent(errorMessage);
    });

    it('has proper button types', () => {
      render(<Login {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: 'Sign in' });
      const forgotPasswordButton = screen.getByText('Forgot Password');
      const createAccountButton = screen.getByText('Create account');

      expect(submitButton).toHaveAttribute('type', 'submit');
      expect(forgotPasswordButton).toHaveAttribute('type', 'button');
      expect(createAccountButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string inputs correctly', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign in' });

      await user.type(emailInput, '   ');
      await user.type(passwordInput, '   ');

      expect(submitButton).toBeDisabled();
    });

    it('handles form submission without onSubmit callback', async () => {
      const user = userEvent.setup();
      render(<Login onForgotPassword={defaultProps.onForgotPassword} onCreateAccount={defaultProps.onCreateAccount} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign in' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      
      expect(() => user.click(submitButton)).not.toThrow();
    });

    it('handles forgot password click without callback', async () => {
      const user = userEvent.setup();
      render(<Login onSubmit={defaultProps.onSubmit} onCreateAccount={defaultProps.onCreateAccount} />);
      
      expect(screen.queryByText('Forgot Password')).not.toBeInTheDocument();
    });

    it('handles create account click without callback', async () => {
      const user = userEvent.setup();
      render(<Login onSubmit={defaultProps.onSubmit} onForgotPassword={defaultProps.onForgotPassword} />);
      
      expect(screen.queryByText('Create account')).not.toBeInTheDocument();
    });
  });
});
