const ApiConstants = {
  
    OMDB_BASE_URL: process.env.OMDB_BASE_URL || 'https://www.omdbapi.com',
    

    SEARCH_TYPES: {
        MOVIE: 'movie',
        SERIES: 'series',
        EPISODE: 'episode'
    },
    
    // Varsayılan değerler
    DEFAULT_PAGE: 1,
    DEFAULT_RESULTS_PER_PAGE: 10
};

module.exports = ApiConstants;