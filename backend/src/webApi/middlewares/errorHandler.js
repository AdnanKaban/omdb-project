// Global Error Handler Middleware
// Tüm yakalanmamış hataları burada yakalıyoruz

const errorHandler = (err, req, res, next) => {
    console.error("==== HATA YAKALANDI ====");
    console.error("URL:", req.originalUrl);
    console.error("Method:", req.method);
    console.error("Hata:", err.message);
    console.error("Stack:", err.stack);
    console.error("========================");

    
    res.status(500).json({
        success: false,
        message: "Sunucuda beklenmeyen bir hata oluştu",
        error: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
};

module.exports = errorHandler;