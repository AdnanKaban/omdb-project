// LocalStorage işlemlerini yöneten helper sınıf
// Tüm localStorage erişimi tek yerden geçiyor (Single Responsibility)

export class StorageHelper {
    // LocalStorage anahtarları (sabit)
    static KEYS = {
        LAST_SEARCH: 'omdb_last_search',
        LAST_RESULTS: 'omdb_last_results',
        LAST_TYPE: 'omdb_last_type'
    };

    /**
     * Veriyi LocalStorage'a kaydeder
     * @param {string} key - Anahtar
     * @param {any} value - Değer (object/array da olabilir)
     */
    static set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('LocalStorage set hatası:', error);
            return false;
        }
    }

    /**
     * LocalStorage'dan veri okur
     * @param {string} key - Anahtar
     * @returns {any|null} - Değer veya null
     */
    static get(key) {
        try {
            const item = localStorage.getItem(key);
            if (item === null) return null;
            return JSON.parse(item);
        } catch (error) {
            console.error('LocalStorage get hatası:', error);
            return null;
        }
    }

    /**
     * Bir anahtarı siler
     */
    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('LocalStorage remove hatası:', error);
            return false;
        }
    }

    /**
     * Tüm uygulama verilerini temizler
     */
    static clearAll() {
        try {
            Object.values(StorageHelper.KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.error('LocalStorage clear hatası:', error);
            return false;
        }
    }

    // ===== ÖZEL METODLAR (UYGULAMA İÇİN) =====

    /**
     * Son aramayı kaydet (term + type + sonuçlar)
     */
    static saveLastSearch(searchTerm, type, results) {
        StorageHelper.set(StorageHelper.KEYS.LAST_SEARCH, searchTerm);
        StorageHelper.set(StorageHelper.KEYS.LAST_TYPE, type);
        StorageHelper.set(StorageHelper.KEYS.LAST_RESULTS, results);
    }

    /**
     * Son aramayı getir
     * @returns {Object|null} - { searchTerm, type, results } veya null
     */
    static getLastSearch() {
        const searchTerm = StorageHelper.get(StorageHelper.KEYS.LAST_SEARCH);
        const type = StorageHelper.get(StorageHelper.KEYS.LAST_TYPE);
        const results = StorageHelper.get(StorageHelper.KEYS.LAST_RESULTS);

        if (!searchTerm) return null;

        return {
            searchTerm,
            type,
            results
        };
    }
}