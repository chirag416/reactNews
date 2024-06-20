import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onCategoryChange, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['Business', 'Technology', 'Entertainment', 'Sports', 'Science'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category.toLowerCase());
    setIsOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  return (
    <div className='flex flex-wrap items-center justify-between px-4'>
      <div className='flex items-center'>
        <img src="/newslogo.png" alt="News Logo" className='w-full max-w-xs h-auto' />
      </div>
        <Link to="/" className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600'>
          Home
        </Link>
      <div className='flex items-center sm:mt-0'>
        
        <div className='relative'>
          <button
            className='px-4 py-2 text-gray-700 rounded-lg shadow-md focus:outline-none'
            onClick={toggleDropdown}
          >
            Categories
          </button>
          {isOpen && (
            <ul className='absolute top-full bg-white left-0 w-40 shadow-md rounded-lg mt-2'>
              {categories.map((category) => (
                <li
                  key={category}
                  className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='flex items-center ml-4'>
          <input
            type="text"
            className='w-40 sm:w-60 lg:w-80 bg-gray-200 rounded-xl px-4 py-2 focus:outline-none'
            placeholder='Search news'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleSearchSubmit}
            className='ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 focus:outline-none'
          >
            Search
          </button>
        </div>
        <div className='ml-6'>
          <Link to="/favorites" className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800'>
            Favorites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
