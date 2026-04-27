class MoviesController {
    // Constructor Injection: Manager'ı dışarıdan al
    constructor(movieService) {
        this.movieService = movieService;

        this.search = this.search.bind(this);
        this.getById = this.getById.bind(this);
    }
    async search(req, res, next) {
        try {
            // 1. Query parametrelerini al
            const searchTerm = req.query.s;       // ?s=batman
            const type = req.query.type || null;  // ?type=movie (opsiyonel)
            const page = parseInt(req.query.page) || 1;  // ?page=1

            // 2. Manager'ı çağır
            const result = await this.movieService.searchMovies(searchTerm, type, page);

            // 3. Sonuca göre HTTP cevabı dön
            if (result.success) {
                return res.status(200).json(result);
            } else {
                // Iş kuralı hatası (validation, bulunamadı vs.) → 400 Bad Request
                return res.status(400).json(result);
            }
        } catch (error) {
            // Beklenmeyen hata → errorHandler middleware'ine yönlendir
            next(error);
        }
    }

    /**
     * GET /api/movies/:imdbID
     * Film detayını getirir
     * Örnek: /api/movies/tt0372784
     */
    async getById(req, res, next) {
        try {
            // 1. URL parametresini al
            const imdbID = req.params.imdbID;

            // 2. Manager'ı çağır
            const result = await this.movieService.getMovieById(imdbID);

            // 3. Sonuca göre HTTP cevabı
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);  // Bulunamadıysa 404
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MoviesController;