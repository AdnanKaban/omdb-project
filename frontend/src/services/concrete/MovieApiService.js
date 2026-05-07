import { IMovieService } from '../abstract/IMovieService.js';
import { HttpClient } from '../../core/utilities/HttpClient.js';
import { ApiConstants } from '../../core/constants/ApiConstants.js';
import { MovieDto } from '../../entities/dtos/MovieDto.js';

// Backend'e istek atan service
// Backend URL'lerini değiştirmek istersen sadece burayı değiştirirsin
export class MovieApiService extends IMovieService {
    constructor() {
        super();
        this.httpClient = new HttpClient(ApiConstants.BASE_URL);
    }

    /**
     * Film araması yapar
     * Backend endpoint: GET /api/movies/search?s=batman&type=movie&page=1
     */
    async searchMovies(searchTerm, type = null, page = 1) {
        try {
            const params = {
                s: searchTerm,
                page: page
            };

            if (type) {
                params.type = type;
            }

            const response = await this.httpClient.get(
                ApiConstants.ENDPOINTS.SEARCH_MOVIES,
                params
            );

            // Backend'den gelen yapı: { success, message, data: { movies, totalResults, page } }
            if (!response.success || !response.data.success) {
                return {
                    success: false,
                    message: response.data?.message || 'Filmler getirilemedi',
                    data: null
                };
            }

            // Backend'den gelen film objelerini MovieDto'ya çevir
            const movieDtos = response.data.data.movies.map(
                movie => new MovieDto(movie)
            );

            return {
                success: true,
                message: response.data.message,
                data: {
                    movies: movieDtos,
                    totalResults: response.data.data.totalResults,
                    page: response.data.data.page
                }
            };

        } catch (error) {
            console.error('searchMovies error:', error);
            return {
                success: false,
                message: 'Beklenmeyen bir hata oluştu',
                data: null
            };
        }
    }

    /**
     * Film detayını getirir
     * Backend endpoint: GET /api/movies/:imdbID
     */
    async getMovieById(imdbID) {
        try {
            const endpoint = `${ApiConstants.ENDPOINTS.GET_MOVIE}/${imdbID}`;
            const response = await this.httpClient.get(endpoint);

            if (!response.success || !response.data.success) {
                return {
                    success: false,
                    message: response.data?.message || 'Film getirilemedi',
                    data: null
                };
            }

            // MovieDto'ya çevir
            const movieDto = new MovieDto(response.data.data);

            return {
                success: true,
                message: response.data.message,
                data: movieDto
            };

        } catch (error) {
            console.error('getMovieById error:', error);
            return {
                success: false,
                message: 'Beklenmeyen bir hata oluştu',
                data: null
            };
        }
    }
}