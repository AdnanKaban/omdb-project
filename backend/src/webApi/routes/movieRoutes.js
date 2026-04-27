const express = require('express');


function createMovieRoutes(moviesController) {
    const router = express.Router();

    // GET /search?s=batman → Film araması
    router.get('/search', moviesController.search);

    // GET /:imdbID → Film detayı (örn: /tt0372784)
    router.get('/:imdbID', moviesController.getById);

    return router;
}

module.exports = createMovieRoutes;