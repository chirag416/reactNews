import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (url) => {
    const updatedFavorites = favorites.filter(article => article.url !== url);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center mt-10">
        <p className="text-center text-blue-500 font-semibold">No favorite articles found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10 mx-2 lg:mx-6 xl:mx-8">
      <div className="flex flex-wrap justify-center gap-4">
        {favorites.map((article, index) => (
          <div key={index} className="flex flex-col w-full sm:w-[45vw] lg:w-[30vw] xl:w-[22vw] mb-4 lg:mb-6 xl:mb-8 overflow-hidden rounded-lg shadow-md">
            <div className="flex-grow flex items-center justify-center bg-gray-200">
              {article.urlToImage ? (
                <img 
                  src={article.urlToImage} 
                  alt={article.title || 'No title available'} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
                />
              ) : (
                <span className="text-gray-500 text-center p-4">No image available</span>
              )}
            </div>
            <div className="p-4">
              <h1 className="text-lg font-bold mb-2 lg:text-xl xl:text-2xl">{article.title || 'No title available'}</h1>
              <p className="text-sm mb-4 lg:text-base xl:text-lg">{article.description || 'No description available'}</p>
              <a
                href={article.url}
                className="text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more...
              </a>
              <button
                onClick={() => removeFromFavorites(article.url)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
              >
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
