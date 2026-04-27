const Messages = {
    // Başarılı mesajlar
    MOVIES_LISTED: "Filmler başarıyla listelendi",
    MOVIE_DETAIL_FETCHED: "Film detayı başarıyla getirildi",
    
    // Hata mesajları
    SEARCH_TERM_REQUIRED: "Arama terimi boş olamaz",
    SEARCH_TERM_TOO_SHORT: "Arama terimi en az 2 karakter olmalı",
    IMDB_ID_REQUIRED: "IMDb ID boş olamaz",
    INVALID_IMDB_ID: "Geçersiz IMDb ID formatı",
    INVALID_TYPE: "Geçersiz tür. Sadece movie, series veya episode kabul edilir",
    INVALID_PAGE: "Sayfa numarası 1'den küçük olamaz",
    
    // OMDB ile ilgili
    NO_MOVIES_FOUND: "Aradığınız kriterlere uygun film bulunamadı",
    MOVIE_NOT_FOUND: "Film bulunamadı",
    OMDB_ERROR: "OMDB API ile iletişim kurulurken bir hata oluştu",
    
    // Genel
    UNEXPECTED_ERROR: "Beklenmeyen bir hata oluştu"
};

module.exports = Messages;