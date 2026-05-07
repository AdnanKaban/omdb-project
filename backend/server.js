
require('dotenv').config();


const express = require('express');
const cors = require('cors');

// DataAccess
const OmdbMovieDal = require('./src/dataAccess/concrete/omdb/OmdbMovieDal');

// Business
const MovieManager = require('./src/business/concrete/MovieManager');

// WebApi
const MoviesController = require('./src/webApi/controllers/MoviesController');
const createMovieRoutes = require('./src/webApi/routes/movieRoutes');
const errorHandler = require('./src/webApi/middlewares/errorHandler');

//  EXPRESS UYGULAMASI
const app = express();
const PORT = process.env.PORT || 5000;

// 5. MIDDLEWARE'LER
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));          // Frontend ile haberleşmek için CORS izinleri
app.use(express.json());    // JSON gövdeleri parse et

// ===== DEPENDENCY INJECTION =====
// Burada katmanları birbirine bağlıyoruz
// Bu yapı sayesinde test etmek ve değiştirmek çok kolay

// 1. DAL nesnesi oluştur
const movieDal = new OmdbMovieDal();

// 2. Manager'a DAL'i inject et
const movieService = new MovieManager(movieDal);

// 3. Controller'a Manager'ı inject et
const moviesController = new MoviesController(movieService);

// 4. Route'ları oluştur
const movieRoutes = createMovieRoutes(moviesController);

// =====  ROUTE'LARI KAYDET =====
app.use('/api/movies', movieRoutes);

// Sağlık kontrolü endpoint'i
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'OMDB Backend API çalışıyor! 🎬',
        endpoints: {
            search: 'GET /api/movies/search?s=batman&type=movie&page=1',
            detail: 'GET /api/movies/:imdbID (örn: /api/movies/tt0372784)'
        }
    });
});

// 404 handler - Tanımsız URL'ler için
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `${req.originalUrl} adresi bulunamadı`
    });
});

// ===== GLOBAL HATA YAKALAYICI =====
// Bu en sonda olmalı! Diğer middleware'lerden sonra
app.use(errorHandler);

// =====  SUNUCUYU BAŞLAT =====
app.listen(PORT, () => {
    console.log('=================================');
    console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
    console.log(`📚 API Dokümantasyonu: http://localhost:${PORT}`);
    console.log('=================================');
});