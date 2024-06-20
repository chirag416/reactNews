import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cards = ({ category, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(12);
  const [favorites, setFavorites] = useState([]);

  const apiKey = "83f4ed4d540b49ecad4c19781177b408";

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const url = searchQuery
        ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
      const response = await axios.get(url);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // Load favorites from local storage on component mount
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, [category, searchQuery]);

  const filteredArticles = articles.filter(article =>
    article.content && article.content !== "[Removed]"
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredArticles.length / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  const toggleFavorite = (article) => {
    let updatedFavorites = [...favorites];
    const articleIndex = updatedFavorites.findIndex(fav => fav.url === article.url);
    if (articleIndex === -1) {
      updatedFavorites.push(article);
    } else {
      updatedFavorites.splice(articleIndex, 1);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (article) => {
    return favorites.some(fav => fav.url === article.url);
  };

  return (
    <div className='flex flex-col items-center mx-2 lg:mx-6 xl:mx-8'>
      {loading ? (
        <p className='text-center text-blue-500 font-semibold'>Loading...</p>
      ) : currentArticles.length > 0 ? (
        <div className='flex flex-wrap justify-center gap-4'>
          {currentArticles.map((article, index) => (
            <div key={index} className='flex flex-col w-full sm:w-[45vw] lg:w-[30vw] xl:w-[22vw] mb-4 lg:mb-6 xl:mb-8 overflow-hidden rounded-lg shadow-md'>
              <div className='flex-grow flex items-center justify-center bg-gray-200'>
                {article.urlToImage ? (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title || 'No title available'} 
                    className='w-full h-full object-cover'
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
                  />
                ) : (
                  <span className='text-gray-500 text-center p-4'>No image available</span>
                )}
              </div>
              <div className='p-4'>
                <h1 className='text-lg font-bold mb-2 lg:text-xl xl:text-2xl'>{article.title || 'No title available'}</h1>
                <p className='text-sm mb-4 lg:text-base xl:text-lg'>{article.description || 'No description available'}</p>
                <a
                  href={article.url}
                  className='text-blue-600 hover:text-blue-800 mx-4'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more...
                </a>
                <button
                  onClick={() => toggleFavorite(article)}
                  className={`mt-2 px-4 py-2 rounded-lg ${isFavorite(article) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {isFavorite(article) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-600 font-bold">No news articles found. Try different keywords or categories.</p>
      )}
      <div className='flex justify-center mt-6'>
        <ul className='flex space-x-3'>
          {pageNumbers.map(number => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-4 my-8 py-2 rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-400'}`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cards;
