import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';

describe('Login Component', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    onForgotPassword: jest.fn(),
    onCreateAccount: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders without crashing', () => {
      render(<Login {...defaultProps} />);
      expect(screen.getByText('Sign in to StubHub')).toBeInTheDocument();
    });

    test('applies default props correctly', () => {
      render(<Login {...defaultProps} />);
      expect(screen.getByText('Sign in to StubHub')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    test('renders custom brand name', () => {
      render(<Login {...defaultProps} brandName="TestBrand" />);
      expect(screen.getByText('Sign in to TestBrand')).toBeInTheDocument();
    });

    test('renders logo when logo prop is provided', () => {
      const logoUrl = 'https://example.com/logo.png';
      render(<Login {...defaultProps} logo={logoUrl} brandName="TestBrand" />);
      const logoImg = screen.getByAltText('TestBrand');
      expect(logoImg).toBeInTheDocument();
      expect(logoImg).toHaveAttribute('src', logoUrl);
    });

    test('does not render logo when logo prop is not provided', () => {
      render(<Login {...defaultProps} brandName="TestBrand" />);
      expect(screen.queryByAltText('TestBrand')).not.toBeInTheDocument();
    });

    test('applies custom theme color', () => {
      const customColor = '#ff0000';
      render(<Login {...defaultProps} themeColor={customColor} />);
      const loginApp = screen.getByText('Sign in to StubHub').closest('.login-app');
      expect(loginApp).toHaveStyle(`--theme-color: ${customColor}`);
    });
  });

  describe('Form Interactions', () => {
    test('updates email input on change', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      await user.type(emailInput, 'test@example.com');
      
      expect(emailInput).toHaveValue('test@example.com');
    });

    test('updates password input on change', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const passwordInput = screen.getByPlaceholderText('Password');
      await user.type(passwordInput, 'password123');
      
      expect(passwordInput).toHaveValue('password123');
    });

    test('toggles stay logged in checkbox', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox', { name: /stay logged in/i });
      expect(checkbox).not.toBeChecked();
      
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
      
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    test('calls onSubmit with correct data when form is submitted', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      render(<Login {...defaultProps} onSubmit={mockOnSubmit} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const checkbox = screen.getByRole('checkbox', { name: /stay logged in/i });
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(checkbox);
      await user.click(submitButton);
      
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        stayLoggedIn: true,
      });
    });

    test('prevents form submission when form is invalid', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      render(<Login {...defaultProps} onSubmit={mockOnSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);
      
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('prevents form submission when email is empty', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      render(<Login {...defaultProps} onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);
      
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('prevents form submission when password is empty', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      render(<Login {...defaultProps} onSubmit={mockOnSubmit} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);
      
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Button States', () => {
    test('sign-in button is disabled when form is invalid', () => {
      render(<Login {...defaultProps} />);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveClass('disabled');
    });

    test('sign-in button is enabled when form is valid', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).not.toHaveClass('disabled');
    });

    test('sign-in button shows loading text when loading prop is true', () => {
      render(<Login {...defaultProps} loading={true} />);
      expect(screen.getByText('Signing in...')).toBeInTheDocument();
    });

    test('sign-in button is disabled when loading prop is true', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} loading={true} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /signing in/i });
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Conditional Rendering', () => {
    test('displays error message when errorMessage prop is provided', () => {
      const errorMessage = 'Invalid credentials';
      render(<Login {...defaultProps} errorMessage={errorMessage} />);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    test('does not display error message when errorMessage prop is empty', () => {
      render(<Login {...defaultProps} errorMessage="" />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('renders forgot password button when onForgotPassword prop is provided', () => {
      render(<Login {...defaultProps} onForgotPassword={jest.fn()} />);
      expect(screen.getByText('Forgot Password')).toBeInTheDocument();
    });

    test('does not render forgot password button when onForgotPassword prop is not provided', () => {
      render(<Login onSubmit={jest.fn()} onCreateAccount={jest.fn()} />);
      expect(screen.queryByText('Forgot Password')).not.toBeInTheDocument();
    });

    test('calls onForgotPassword when forgot password button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnForgotPassword = jest.fn();
      render(<Login {...defaultProps} onForgotPassword={mockOnForgotPassword} />);
      
      const forgotPasswordButton = screen.getByText('Forgot Password');
      await user.click(forgotPasswordButton);
      
      expect(mockOnForgotPassword).toHaveBeenCalledTimes(1);
    });

    test('renders email code button when showEmailCode is true', () => {
      render(<Login {...defaultProps} showEmailCode={true} />);
      expect(screen.getByText('Sign in with Email Code')).toBeInTheDocument();
    });

    test('does not render email code button when showEmailCode is false', () => {
      render(<Login {...defaultProps} showEmailCode={false} />);
      expect(screen.queryByText('Sign in with Email Code')).not.toBeInTheDocument();
    });

    test('renders create account section when showCreateAccount is true and onCreateAccount is provided', () => {
      render(<Login {...defaultProps} showCreateAccount={true} onCreateAccount={jest.fn()} />);
      expect(screen.getByText(/New to StubHub?/)).toBeInTheDocument();
      expect(screen.getByText('Create account')).toBeInTheDocument();
    });

    test('does not render create account section when showCreateAccount is false', () => {
      render(<Login {...defaultProps} showCreateAccount={false} onCreateAccount={jest.fn()} />);
      expect(screen.queryByText(/New to StubHub?/)).not.toBeInTheDocument();
    });

    test('does not render create account section when onCreateAccount is not provided', () => {
      render(<Login onSubmit={jest.fn()} showCreateAccount={true} />);
      expect(screen.queryByText(/New to StubHub?/)).not.toBeInTheDocument();
    });

    test('calls onCreateAccount when create account button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnCreateAccount = jest.fn();
      render(<Login {...defaultProps} showCreateAccount={true} onCreateAccount={mockOnCreateAccount} />);
      
      const createAccountButton = screen.getByText('Create account');
      await user.click(createAccountButton);
      
      expect(mockOnCreateAccount).toHaveBeenCalledTimes(1);
    });
  });

  describe('Social Login', () => {
    const socialLogins = [
      {
        type: 'facebook',
        icon: 'https://example.com/facebook-icon.png',
        onLogin: jest.fn(),
      },
      {
        type: 'apple',
        icon: 'https://example.com/apple-icon.png',
        onLogin: jest.fn(),
      },
      {
        type: 'google',
        icon: 'https://example.com/google-icon.png',
        onLogin: jest.fn(),
      },
    ];

    test('renders social login buttons when socialLogins array is provided', () => {
      render(<Login {...defaultProps} socialLogins={socialLogins} />);
      
      expect(screen.getByText('Log in with Facebook')).toBeInTheDocument();
      expect(screen.getByText('Sign in with Apple')).toBeInTheDocument();
      expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
    });

    test('does not render social login buttons when socialLogins array is empty', () => {
      render(<Login {...defaultProps} socialLogins={[]} />);
      
      expect(screen.queryByText('Log in with Facebook')).not.toBeInTheDocument();
      expect(screen.queryByText('Sign in with Apple')).not.toBeInTheDocument();
      expect(screen.queryByText('Sign in with Google')).not.toBeInTheDocument();
    });

    test('calls respective onLogin functions when social login buttons are clicked', async () => {
      const user = userEvent.setup();
      render(<Login {...defaultProps} socialLogins={socialLogins} />);
      
      const facebookButton = screen.getByText('Log in with Facebook');
      const appleButton = screen.getByText('Sign in with Apple');
      const googleButton = screen.getByText('Sign in with Google');
      
      await user.click(facebookButton);
      expect(socialLogins[0].onLogin).toHaveBeenCalledTimes(1);
      
      await user.click(appleButton);
      expect(socialLogins[1].onLogin).toHaveBeenCalledTimes(1);
      
      await user.click(googleButton);
      expect(socialLogins[2].onLogin).toHaveBeenCalledTimes(1);
    });

    test('renders social login icons when provided', () => {
      render(<Login {...defaultProps} socialLogins={socialLogins} />);
      
      const facebookIcon = screen.getByAltText('facebook');
      const appleIcon = screen.getByAltText('apple');
      const googleIcon = screen.getByAltText('google');
      
      expect(facebookIcon).toBeInTheDocument();
      expect(facebookIcon).toHaveAttribute('src', socialLogins[0].icon);
      
      expect(appleIcon).toBeInTheDocument();
      expect(appleIcon).toHaveAttribute('src', socialLogins[1].icon);
      
      expect(googleIcon).toBeInTheDocument();
      expect(googleIcon).toHaveAttribute('src', socialLogins[2].icon);
    });

    test('renders social login buttons without icons when icons are not provided', () => {
      const socialLoginsWithoutIcons = [
        { type: 'facebook', onLogin: jest.fn() },
        { type: 'apple', onLogin: jest.fn() },
        { type: 'google', onLogin: jest.fn() },
      ];
      
      render(<Login {...defaultProps} socialLogins={socialLoginsWithoutIcons} />);
      
      expect(screen.getByText('Log in with Facebook')).toBeInTheDocument();
      expect(screen.getByText('Sign in with Apple')).toBeInTheDocument();
      expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
      
      expect(screen.queryByAltText('facebook')).not.toBeInTheDocument();
      expect(screen.queryByAltText('apple')).not.toBeInTheDocument();
      expect(screen.queryByAltText('google')).not.toBeInTheDocument();
    });
  });

  describe('Form Validation Edge Cases', () => {
    test('form is invalid when email contains only whitespace', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      render(<Login {...defaultProps} onSubmit={mockOnSubmit} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await user.type(emailInput, '   ');
      await user.type(passwordInput, 'password123');
      
      expect(submitButton).toBeDisabled();
      
      await user.click(submitButton);
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('form is invalid when password contains only whitespace', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      render(<Login {...defaultProps} onSubmit={mockOnSubmit} />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, '   ');
      
      expect(submitButton).toBeDisabled();
      
      await user.click(submitButton);
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form has proper accessibility attributes', () => {
      render(<Login {...defaultProps} errorMessage="Test error" />);
      
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const errorAlert = screen.getByRole('alert');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('required');
      expect(errorAlert).toHaveAttribute('role', 'alert');
    });

    test('checkbox has proper label association', () => {
      render(<Login {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox', { name: /stay logged in/i });
      expect(checkbox).toBeInTheDocument();
    });
  });
});
