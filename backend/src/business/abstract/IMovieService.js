// IMovieService - Movie Service Interface

class IMovieService {
    /**
     * Film araması yapar ve liste DTO'ları döner
     * @param {string} searchTerm - Aranacak film adı
     * @param {string} type - 'movie', 'series', 'episode' 
     * @param {number} page - Sayfa numarası
     * @returns {Promise<DataResult>} - SuccessDataResult veya ErrorDataResult
     */
    async searchMovies(searchTerm, type = null, page = 1) {
        throw new Error("searchMovies() metodu alt sınıfta uygulanmalı!");
    }

    /**
     * Belirli bir filmin detayını getirir
     * @param {string} imdbID - IMDb ID
     * @returns {Promise<DataResult>} - MovieDetailDto döner
     */
    async getMovieById(imdbID) {
        throw new Error("getMovieById() metodu alt sınıfta uygulanmalı!");
    }
}

module.exports = IMovieService;