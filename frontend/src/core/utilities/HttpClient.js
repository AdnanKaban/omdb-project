// HTTP istekleri için yardımcı sınıf
// Tüm fetch işlemlerini tek yerden yönetiyoruz
export class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * GET isteği at
     * @param {string} endpoint - URL endpoint'i (örn: /api/movies/search)
     * @param {Object} params - Query parametreleri (örn: { s: 'batman' })
     */
    async get(endpoint, params = {}) {
        try {
            // Query string oluştur
            const queryString = new URLSearchParams(params).toString();
            const url = `${this.baseUrl}${endpoint}${queryString ? '?' + queryString : ''}`;

            console.log('🌐 GET isteği:', url);

            // Fetch isteği at
            const response = await fetch(url);
            const data = await response.json();

            return {
                success: response.ok,
                status: response.status,
                data: data
            };
        } catch (error) {
            console.error('HTTP hatası:', error);
            return {
                success: false,
                status: 0,
                data: null,
                error: error.message
            };
        }
    }
}