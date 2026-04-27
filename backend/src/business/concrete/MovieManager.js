const IMovieService = require('../abstract/IMovieService');
const MovieListDto = require('../../entities/dtos/MovieListDto');
const MovieDetailDto = require('../../entities/dtos/MovieDetailDto');
const SuccessDataResult = require('../../core/utilities/results/SuccessDataResult');
const ErrorDataResult = require('../../core/utilities/results/ErrorDataResult');
const ApiConstants = require('../../core/constants/ApiConstants');
const Messages = require('../constants/Messages');

class MovieManager extends IMovieService {
    // Constructor Injection: Hangi DAL kullanılacağını dışarıdan al
    // Bu sayede MovieManager, OmdbMovieDal'a bağımlı değil!
    constructor(movieDal) {
        super();
        this.movieDal = movieDal;
    }

    /**
     * Film araması yapar
     */
    async searchMovies(searchTerm, type = null, page = 1) {
        try {
            // ===== 1. VALIDATION (İŞ KURALLARI) =====
            
            // Arama terimi boş olamaz
            if (!searchTerm || searchTerm.trim() === "") {
                return new ErrorDataResult(null, Messages.SEARCH_TERM_REQUIRED);
            }

            // Arama terimi en az 2 karakter olmalı (OMDB kuralı)
            if (searchTerm.trim().length < 2) {
                return new ErrorDataResult(null, Messages.SEARCH_TERM_TOO_SHORT);
            }

            // Tür kontrolü
            if (type) {
                const validTypes = Object.values(ApiConstants.SEARCH_TYPES);
                if (!validTypes.includes(type)) {
                    return new ErrorDataResult(null, Messages.INVALID_TYPE);
                }
            }

            // Sayfa numarası kontrolü
            if (page < 1) {
                return new ErrorDataResult(null, Messages.INVALID_PAGE);
            }

            // ===== 2. DATA ACCESS ÇAĞRISI =====
            const result = await this.movieDal.search(
                searchTerm.trim(),
                type,
                page
            );

            // OMDB film bulamadı
            if (!result.success) {
                return new ErrorDataResult(null, Messages.NO_MOVIES_FOUND);
            }

            // ===== 3. ENTITY -> DTO MAPPING =====
            // Manager, Entity'leri direkt göndermez! DTO'ya çevirir
            const movieDtos = result.movies.map(movie => new MovieListDto({
                imdbID: movie.imdbID,
                title: movie.title,
                year: movie.year,
                type: movie.type,
                poster: movie.poster
            }));

            // ===== 4. BAŞARILI SONUÇ DÖN =====
            return new SuccessDataResult(
                {
                    movies: movieDtos,
                    totalResults: result.totalResults,
                    page: page
                },
                Messages.MOVIES_LISTED
            );

        } catch (error) {
            // Beklenmeyen hata (network, server vs.)
            console.error("MovieManager.searchMovies error:", error.message);
            return new ErrorDataResult(null, Messages.OMDB_ERROR);
        }
    }

    /**
     * Film detayını getirir
     */
    async getMovieById(imdbID) {
        try {
            // ===== 1. VALIDATION =====
            
            if (!imdbID || imdbID.trim() === "") {
                return new ErrorDataResult(null, Messages.IMDB_ID_REQUIRED);
            }

            // IMDb ID formatı kontrolü: tt + rakamlar (örn: tt0372784)
            const imdbIdPattern = /^tt\d{7,}$/;
            if (!imdbIdPattern.test(imdbID.trim())) {
                return new ErrorDataResult(null, Messages.INVALID_IMDB_ID);
            }

            // ===== 2. DATA ACCESS =====
            const result = await this.movieDal.getById(imdbID.trim());

            if (!result.success) {
                return new ErrorDataResult(null, Messages.MOVIE_NOT_FOUND);
            }

            // ===== 3. ENTITY -> DTO MAPPING =====
            const movieDetailDto = new MovieDetailDto({
                imdbID: result.movie.imdbID,
                title: result.movie.title,
                year: result.movie.year,
                type: result.movie.type,
                poster: result.movie.poster,
                genre: result.movie.genre,
                director: result.movie.director,
                plot: result.movie.plot,
                actors: result.movie.actors,
                runtime: result.movie.runtime,
                released: result.movie.released,
                country: result.movie.country,
                language: result.movie.language,
                awards: result.movie.awards,
                imdbRating: result.movie.imdbRating,
                imdbVotes: result.movie.imdbVotes
            });

            // ===== 4. BAŞARILI SONUÇ =====
            return new SuccessDataResult(
                movieDetailDto,
                Messages.MOVIE_DETAIL_FETCHED
            );

        } catch (error) {
            console.error("MovieManager.getMovieById error:", error.message);
            return new ErrorDataResult(null, Messages.OMDB_ERROR);
        }
    }
}

module.exports = MovieManager;