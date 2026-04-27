// IMovieDal - Movie Data Access Layer Interface



class IMovieDal {
    /**
    
     * @param {string} searchTerm - Aranacak film adı
     * @param {string} type - Tür: 'movie', 'series', 'episode' 
     * @param {number} page - Sayfa numarası 
     * @returns {Promise<Array>} - Bulunan filmlerin listesi
     */
    async search(searchTerm, type = null, page = 1) {
        throw new Error("search() metodu alt sınıfta uygulanmalı!");
    }

    /**
     * Belirli bir filmin detayını getirir
     * @param {string} imdbID - IMDb ID
     * @returns {Promise<Object>} - Film detayı
     */
    async getById(imdbID) {
        throw new Error("getById() metodu alt sınıfta uygulanmalı!");
    }
}

module.exports = IMovieDal;