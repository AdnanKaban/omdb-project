class Movie {
    constructor({
        imdbID,
        Title,
        Year,
        Type,
        Poster,
        Genre,
        Director,
        Plot,
        Actors,
        Runtime,
        Released,
        Country,
        Language,
        Awards,
        imdbRating,
        imdbVotes,
        BoxOffice,
        Production,
        Writer,
        Ratings
    } = {}) {
        this.imdbID = imdbID;
        this.title = Title;
        this.year = Year;
        this.type = Type;
        this.poster = Poster;
        this.genre = Genre;
        this.director = Director;
        this.plot = Plot;
        this.actors = Actors;
        this.runtime = Runtime;
        this.released = Released;
        this.country = Country;
        this.language = Language;
        this.awards = Awards;
        this.imdbRating = imdbRating;
        this.imdbVotes = imdbVotes;
        this.boxOffice = BoxOffice;
        this.production = Production;
        this.writer = Writer;
        this.ratings = Ratings;
    }
}

module.exports = Movie;