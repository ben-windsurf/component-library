import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const mockSearchIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMkM1LjEzNCAyIDIgNS4xMzQgMiA5UzUuMTM0IDE2IDkgMTZTMTYgMTIuODY2IDE2IDlTMTIuODY2IDIgOSAyWk05IDE0QzYuMjM5IDE0IDQgMTEuNzYxIDQgOVM2LjIzOSA0IDkgNFMxNCA2LjIzOSAxNCA5UzExLjc2MSAxNCA5IDE0WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMTUuNSAxNS41TDE4IDE4IiBzdHJva2U9IiMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=';

  it('renders with default props', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search events, artists, teams, and more');
    expect(input).toHaveClass('search-input');
  });

  it('renders with custom placeholder', () => {
    const customPlaceholder = 'Search for tickets...';
    render(<SearchBar placeholder={customPlaceholder} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', customPlaceholder);
  });

  it('renders with search icon', () => {
    render(<SearchBar searchIcon={mockSearchIcon} />);
    
    const icon = screen.getByAltText('Search');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', mockSearchIcon);
    expect(icon).toHaveClass('search-icon');
  });

  it('applies custom theme color as CSS custom property', () => {
    const customThemeColor = '#ff0000';
    render(<SearchBar themeColor={customThemeColor} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle('--theme-color: #ff0000');
  });

  it('applies default theme color when not provided', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle('--theme-color: #6f42c1');
  });

  it('has correct CSS classes applied', () => {
    render(<SearchBar searchIcon={mockSearchIcon} />);
    
    const container = screen.getByRole('textbox').parentElement;
    const input = screen.getByRole('textbox');
    const icon = screen.getByAltText('Search');
    
    expect(container).toHaveClass('search-bar');
    expect(input).toHaveClass('search-input');
    expect(icon).toHaveClass('search-icon');
  });

  it('renders input with correct type', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('handles all props together', () => {
    const props = {
      themeColor: '#123456',
      searchIcon: mockSearchIcon,
      placeholder: 'Custom search placeholder'
    };
    
    render(<SearchBar {...props} />);
    
    const input = screen.getByRole('textbox');
    const icon = screen.getByAltText('Search');
    
    expect(input).toHaveAttribute('placeholder', props.placeholder);
    expect(input).toHaveStyle('--theme-color: #123456');
    expect(icon).toHaveAttribute('src', props.searchIcon);
  });

  it('renders search icon element even when no icon src is provided', () => {
    render(<SearchBar />);
    
    const icon = screen.getByAltText('Search');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('search-icon');
  });
});
