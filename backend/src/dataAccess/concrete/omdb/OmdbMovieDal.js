const axios = require('axios');
const IMovieDal = require('../../abstract/IMovieDal');
const Movie = require('../../../entities/concrete/Movie');
const ApiConstants = require('../../../core/constants/ApiConstants');

// OMDB API ile iletişim kuran concrete sınıf
// IMovieDal'i extend ediyor (interface implementasyonu)
class OmdbMovieDal extends IMovieDal {
    constructor() {
        super();
        this.baseUrl = ApiConstants.OMDB_BASE_URL;
        this.apiKey = process.env.OMDB_API_KEY;

        // API key kontrolü - güvenlik için
        if (!this.apiKey) {
            throw new Error("OMDB_API_KEY .env dosyasında tanımlı değil!");
        }
    }

    /**
     * OMDB'de film araması yapar
     * Endpoint: https://www.omdbapi.com/?apikey=KEY&s=batman&type=movie&page=1
     */
    async search(searchTerm, type = null, page = 1) {
        try {
            // Query parametrelerini hazırla
            const params = {
                apikey: this.apiKey,
                s: searchTerm,    // 's' = search (OMDB'nin parametre adı)
                page: page
            };

            // Eğer tür filtrelemesi varsa ekle
            if (type) {
                params.type = type;
            }

            // OMDB'ye GET isteği at
            const response = await axios.get(this.baseUrl, { params });

            // OMDB hata döndürdüyse (örn: film bulunamadı)
            if (response.data.Response === "False") {
                return {
                    success: false,
                    error: response.data.Error,
                    movies: [],
                    totalResults: 0
                };
            }

            // Başarılı sonuç - filmleri Movie entity'sine map et
            // OMDB search endpoint'i her film için sınırlı bilgi döner
            const movies = response.data.Search.map(item => new Movie(item));

            return {
                success: true,
                movies: movies,
                totalResults: parseInt(response.data.totalResults)
            };

        } catch (error) {
            // Network hatası, timeout vs.
            console.error("OMDB search error:", error.message);
            throw new Error("OMDB API'ye bağlanırken hata oluştu");
        }
    }

    /**
     * IMDb ID ile film detayını getirir
     * Endpoint: https://www.omdbapi.com/?apikey=KEY&i=tt0372784&plot=full
     */
    async getById(imdbID) {
        try {
            const params = {
                apikey: this.apiKey,
                i: imdbID,        // 'i' = IMDb ID (OMDB'nin parametre adı)
                plot: 'full'      // Tam özet getir
            };

            const response = await axios.get(this.baseUrl, { params });

            // Film bulunamadıysa
            if (response.data.Response === "False") {
                return {
                    success: false,
                    error: response.data.Error,
                    movie: null
                };
            }

            // Başarılı - Movie entity'sine map et
            const movie = new Movie(response.data);

            return {
                success: true,
                movie: movie
            };

        } catch (error) {
            console.error("OMDB getById error:", error.message);
            throw new Error("OMDB API'ye bağlanırken hata oluştu");
        }
    }
}

module.exports = OmdbMovieDal;