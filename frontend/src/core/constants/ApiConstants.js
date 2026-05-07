// Backend URL'leri ve sabitler
export const ApiConstants = {
    // Backend base URL - geliştirme için
    BASE_URL: 'https://omdb-project-0x4w.onrender.com',
    
    // API endpoint'leri
    ENDPOINTS: {
        SEARCH_MOVIES: '/api/movies/search',
        GET_MOVIE: '/api/movies'  // /:imdbID eklenir
    },
    
    // Arama tipleri
    SEARCH_TYPES: {
        MOVIE: 'movie',
        SERIES: 'series',
        EPISODE: 'episode'
    },
    
    // Varsayılan değerler
    DEFAULT_PAGE: 1,
    RESULTS_PER_PAGE: 10
};