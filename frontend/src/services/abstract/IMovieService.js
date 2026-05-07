// Frontend Service Interface
// "Ne yapılacak" - sözleşme

export class IMovieService {
    async searchMovies(searchTerm, type = null, page = 1) {
        throw new Error("searchMovies() metodu alt sınıfta uygulanmalı!");
    }

    async getMovieById(imdbID) {
        throw new Error("getMovieById() metodu alt sınıfta uygulanmalı!");
    }
}