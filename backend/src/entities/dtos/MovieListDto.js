
class MovieListDto {
    constructor({ imdbID, title, year, type, poster } = {}) {
        this.imdbID = imdbID;    
        this.title = title;         
        this.year = year;            
        this.type = type;            
        this.poster = poster;        
    }
}

module.exports = MovieListDto;