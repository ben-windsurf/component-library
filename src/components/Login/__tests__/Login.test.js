import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';

describe('Login', () => {
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
      render(<Login {...defaultProps} brandName="Custom Brand" />);
      
      expect(screen.getByText('Sign in to Custom Brand')).toBeInTheDocument();
      expect(screen.getByText('New to Custom Brand?')).toBeInTheDocument();
    });

    it('renders logo when provided', () => {
      const logoSrc = 'data:image/svg+xml;base64,test';
      render(<Login {...defaultProps} logo={logoSrc} brandName="Test Brand" />);
      
      const logo = screen.getByAltText('Test Brand');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', logoSrc);
    });

    it('does not render logo when not provided', () => {
      render(<Login {...defaultProps} />);
      
      const logo = screen.queryByRole('img');
      expect(logo).not.toBeInTheDocument();
    });

    it('applies custom theme color as CSS custom property', () => {
      const customThemeColor = '#ff0000';
      render(<Login {...defaultProps} themeColor={customThemeColor} />);
      
      const container = screen.getByText('Sign in to StubHub').closest('.login-app');
      expect(container).toHaveStyle('--theme-color: #ff0000');
      expect(container).toHaveStyle('--brand-color: #ff0000');
    });
  });

  describe('Form Interaction', () => {
    it('updates email input value', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      await user.type(emailInput, 'test@example.com');
      
      expect(emailInput).toHaveValue('test@example.com');
    });

    it('updates password input value', async () => {
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

    it('disables submit button when form is invalid', () => {
      render(<Login {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: 'Sign in' });
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveClass('disabled');
    });

    it('enables submit button when form is valid', async () => {
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

    it('calls onSubmit with form data when submitted', async () => {
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

    it('does not submit when form is invalid', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      render(<Login {...defaultProps} onSubmit={mockOnSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: 'Sign in' });
      await user.click(submitButton);
      
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('shows loading text when loading is true', () => {
      render(<Login {...defaultProps} loading={true} />);
      
      const submitButton = screen.getByRole('button', { name: 'Signing in...' });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('disables submit button when loading', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} loading={true} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      
      const submitButton = screen.getByRole('button', { name: 'Signing in...' });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Error Handling', () => {
    it('displays error message when provided', () => {
      const errorMessage = 'Invalid credentials';
      render(<Login {...defaultProps} errorMessage={errorMessage} />);
      
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(errorMessage);
      expect(alert).toHaveClass('alert-danger');
    });

    it('does not display error message when not provided', () => {
      render(<Login {...defaultProps} />);
      
      const alert = screen.queryByRole('alert');
      expect(alert).not.toBeInTheDocument();
    });
  });

  describe('Forgot Password', () => {
    it('renders forgot password button when onForgotPassword is provided', () => {
      render(<Login {...defaultProps} />);
      
      const forgotPasswordButton = screen.getByText('Forgot Password');
      expect(forgotPasswordButton).toBeInTheDocument();
    });

    it('does not render forgot password button when onForgotPassword is not provided', () => {
      render(<Login {...defaultProps} onForgotPassword={undefined} />);
      
      const forgotPasswordButton = screen.queryByText('Forgot Password');
      expect(forgotPasswordButton).not.toBeInTheDocument();
    });

    it('calls onForgotPassword when clicked', async () => {
      const user = userEvent.setup();
      const mockOnForgotPassword = jest.fn();
      render(<Login {...defaultProps} onForgotPassword={mockOnForgotPassword} />);
      
      const forgotPasswordButton = screen.getByText('Forgot Password');
      await user.click(forgotPasswordButton);
      
      expect(mockOnForgotPassword).toHaveBeenCalled();
    });
  });

  describe('Email Code Login', () => {
    it('renders email code button when showEmailCode is true', () => {
      render(<Login {...defaultProps} showEmailCode={true} />);
      
      const emailCodeButton = screen.getByText('Sign in with Email Code');
      expect(emailCodeButton).toBeInTheDocument();
    });

    it('does not render email code button when showEmailCode is false', () => {
      render(<Login {...defaultProps} showEmailCode={false} />);
      
      const emailCodeButton = screen.queryByText('Sign in with Email Code');
      expect(emailCodeButton).not.toBeInTheDocument();
    });
  });

  describe('Social Login', () => {
    const socialLogins = [
      {
        type: 'facebook',
        icon: 'facebook-icon.svg',
        onLogin: jest.fn()
      },
      {
        type: 'google',
        icon: 'google-icon.svg',
        onLogin: jest.fn()
      },
      {
        type: 'apple',
        icon: 'apple-icon.svg',
        onLogin: jest.fn()
      }
    ];

    beforeEach(() => {
      socialLogins.forEach(social => social.onLogin.mockClear());
    });

    it('renders social login buttons when provided', () => {
      render(<Login {...defaultProps} socialLogins={socialLogins} />);
      
      expect(screen.getByText('Log in with Facebook')).toBeInTheDocument();
      expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
      expect(screen.getByText('Sign in with Apple')).toBeInTheDocument();
    });

    it('does not render social login section when no social logins provided', () => {
      render(<Login {...defaultProps} socialLogins={[]} />);
      
      expect(screen.queryByText('Log in with Facebook')).not.toBeInTheDocument();
    });

    it('calls social login handlers when clicked', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} socialLogins={socialLogins} />);
      
      const facebookButton = screen.getByText('Log in with Facebook');
      await user.click(facebookButton);
      
      expect(socialLogins[0].onLogin).toHaveBeenCalled();
    });

    it('renders social icons when provided', () => {
      render(<Login {...defaultProps} socialLogins={socialLogins} />);
      
      const facebookIcon = screen.getByAltText('facebook');
      const googleIcon = screen.getByAltText('google');
      const appleIcon = screen.getByAltText('apple');
      
      expect(facebookIcon).toHaveAttribute('src', 'facebook-icon.svg');
      expect(googleIcon).toHaveAttribute('src', 'google-icon.svg');
      expect(appleIcon).toHaveAttribute('src', 'apple-icon.svg');
    });
  });

  describe('Create Account', () => {
    it('renders create account section when showCreateAccount is true and onCreateAccount is provided', () => {
      render(<Login {...defaultProps} showCreateAccount={true} />);
      
      expect(screen.getByText('New to StubHub?')).toBeInTheDocument();
      expect(screen.getByText('Create account')).toBeInTheDocument();
    });

    it('does not render create account section when showCreateAccount is false', () => {
      render(<Login {...defaultProps} showCreateAccount={false} />);
      
      expect(screen.queryByText('New to StubHub?')).not.toBeInTheDocument();
    });

    it('does not render create account section when onCreateAccount is not provided', () => {
      render(<Login {...defaultProps} onCreateAccount={undefined} />);
      
      expect(screen.queryByText('New to StubHub?')).not.toBeInTheDocument();
    });

    it('calls onCreateAccount when clicked', async () => {
      const user = userEvent.setup();
      const mockOnCreateAccount = jest.fn();
      render(<Login {...defaultProps} onCreateAccount={mockOnCreateAccount} />);
      
      const createAccountButton = screen.getByText('Create account');
      await user.click(createAccountButton);
      
      expect(mockOnCreateAccount).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper form structure', () => {
      render(<Login {...defaultProps} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('required');
      
      const form = emailInput.closest('form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveClass('login-form');
    });

    it('has proper button types', () => {
      render(<Login {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: 'Sign in' });
      const forgotPasswordButton = screen.getByText('Forgot Password');
      
      expect(submitButton).toHaveAttribute('type', 'submit');
      expect(forgotPasswordButton).toHaveAttribute('type', 'button');
    });
  });
});
