const React = require('react');
require('./SearchBar.css');

const themes = {
  purple: {
    primary: '#6f42c1',
    primaryHover: '#5a3fa8'
  },
  green: {
    primary: '#78a42c',
    primaryHover: '#6a8f26'
  }
};

const SearchBar = ({ 
  theme = 'purple',
  searchIcon,
  navigationIcon,
  location = 'San Francisco',
  selectedCategory = 'All types',
  onCategoryChange = () => {},
  categories = ['All types', 'Sports', 'Concerts', 'Theater & Comedy'],
  placeholder = "Search events, artists, teams, and more"
}) => {
  const themeColors = themes[theme] || themes.purple;

  return React.createElement('div', {
    className: 'search-bar__section',
    style: { '--theme-primary': themeColors.primary, '--theme-primary-hover': themeColors.primaryHover }
  },
    React.createElement('div', { className: 'search-bar__container' },
      React.createElement('div', { className: 'search-bar__bar' },
        React.createElement('img', { src: searchIcon, alt: 'Search', className: 'search-bar__icon' }),
        React.createElement('input', {
          type: 'text',
          placeholder: placeholder,
          className: 'search-bar__input'
        })
      )
    ),
    React.createElement('div', { className: 'search-bar__filter-bar' },
      React.createElement('div', { className: 'search-bar__location-selector' },
        React.createElement('img', { src: navigationIcon, alt: 'Location', className: 'search-bar__location-icon' }),
        React.createElement('span', null, location),
        React.createElement('span', { className: 'search-bar__dropdown-arrow' }, '▼')
      ),
      React.createElement('div', { className: 'search-bar__date-selector' },
        React.createElement('span', null, 'All dates'),
        React.createElement('span', { className: 'search-bar__dropdown-arrow' }, '▼')
      ),
      React.createElement('div', { className: 'search-bar__category-filters' },
        categories.map((category) =>
          React.createElement('button', {
            key: category,
            className: `search-bar__filter-btn ${selectedCategory === category ? 'search-bar__filter-btn--active' : ''}`,
            onClick: () => onCategoryChange(category)
          }, category)
        )
      )
    )
  );
};

module.exports = SearchBar;
