// Frontend tarafında film verisini tutan DTO
// Backend'den gelen JSON'u bu sınıfa map ediyoruz
export class MovieDto {
    constructor({
        imdbID,
        title,
        year,
        type,
        poster,
        genre,
        director,
        plot,
        actors,
        runtime,
        released,
        country,
        language,
        awards,
        imdbRating,
        imdbVotes
    } = {}) {
        this.imdbID = imdbID;
        this.title = title;
        this.year = year;
        this.type = type;
        this.poster = poster;
        this.genre = genre;
        this.director = director;
        this.plot = plot;
        this.actors = actors;
        this.runtime = runtime;
        this.released = released;
        this.country = country;
        this.language = language;
        this.awards = awards;
        this.imdbRating = imdbRating;
        this.imdbVotes = imdbVotes;
    }

    // Poster yoksa placeholder döndür
    hasPoster() {
        return this.poster && this.poster !== 'N/A';
    }

    // Görüntülenecek tür adı (Türkçe)
    getDisplayType() {
        const types = {
            'movie': 'Film',
            'series': 'Dizi',
            'episode': 'Bölüm'
        };
        return types[this.type] || this.type;
    }
}