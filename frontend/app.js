// ===== IMPORTS =====
import { MovieApiService } from './src/services/concrete/MovieApiService.js';
import { MovieView } from './src/presentation/views/MovieView.js';
import { StorageHelper } from './src/core/utilities/StorageHelper.js';
import { MovieDto } from './src/entities/dtos/MovieDto.js';

// ===== DEPENDENCY INJECTION =====
const movieService = new MovieApiService();

// ===== DOM ELEMENTLERİ =====
const elements = {
    searchInput: document.getElementById('searchInput'),
    typeFilter: document.getElementById('typeFilter'),
    searchButton: document.getElementById('searchButton'),
    
    messageArea: document.getElementById('messageArea'),
    loadingArea: document.getElementById('loadingArea'),
    moviesContainer: document.getElementById('moviesContainer'),
    resultsInfo: document.getElementById('resultsInfo'),
    paginationArea: document.getElementById('paginationArea'),
    
    movieModal: document.getElementById('movieModal'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalClose: document.getElementById('modalClose'),
    modalBody: document.getElementById('modalBody')
};

// ===== STATE =====
let currentMovies = [];
let currentTotalResults = 0;
let currentPage = 1;
let currentSearchTerm = '';
let currentType = null;

const RESULTS_PER_PAGE = 10; // OMDB API her sayfada 10 sonuç döner

// ===== HELPER FUNCTIONS =====

function showMessage(message, type = 'error') {
    elements.messageArea.innerHTML = `
        <div class="message message--${type}">
            ${message}
        </div>
    `;
    
    setTimeout(() => {
        elements.messageArea.innerHTML = '';
    }, 5000);
}

function setLoading(isLoading) {
    if (isLoading) {
        elements.loadingArea.classList.remove('hidden');
        elements.moviesContainer.innerHTML = '';
        elements.resultsInfo.classList.add('hidden');
        elements.paginationArea.classList.add('hidden');
    } else {
        elements.loadingArea.classList.add('hidden');
    }
}

function createMovieCard(movie) {
    const posterHtml = movie.hasPoster()
        ? `<img src="${movie.poster}" alt="${movie.title}" class="movie-card__poster" onerror="this.style.display='none'">`
        : `<div class="movie-card__poster movie-card__poster--placeholder">
               <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                   <rect x="2" y="3" width="20" height="18" rx="2" ry="2"/>
                   <line x1="8" y1="3" x2="8" y2="21"/>
                   <line x1="16" y1="3" x2="16" y2="21"/>
               </svg>
           </div>`;

    return `
        <div class="movie-card" data-imdb-id="${movie.imdbID}">
            ${posterHtml}
            <div class="movie-card__info">
                <h3 class="movie-card__title">${movie.title}</h3>
                <div class="movie-card__meta">
                    <span>${movie.year}</span>
                    <span class="movie-card__type">${movie.getDisplayType()}</span>
                </div>
            </div>
        </div>
    `;
}

function renderMovies(movies, totalResults) {
    if (!movies || movies.length === 0) {
        elements.moviesContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 20px; opacity: 0.5;">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <p style="font-size: 1.1rem;">Hiç film bulunamadı</p>
            </div>
        `;
        return;
    }

    elements.moviesContainer.innerHTML = movies
        .map(movie => createMovieCard(movie))
        .join('');

    elements.resultsInfo.classList.remove('hidden');
    
    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE + 1;
    const endIndex = Math.min(startIndex + movies.length - 1, totalResults);
    elements.resultsInfo.textContent = `${totalResults} sonuç içinden ${startIndex}-${endIndex} arası gösteriliyor`;

    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const imdbID = card.getAttribute('data-imdb-id');
            openMovieDetail(imdbID);
        });
    });

    // Pagination'ı render et
    renderPagination(totalResults);
}

// ===== PAGINATION (YENİ) =====

function renderPagination(totalResults) {
    const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

    if (totalPages <= 1) {
        elements.paginationArea.classList.add('hidden');
        return;
    }

    elements.paginationArea.classList.remove('hidden');
    elements.paginationArea.innerHTML = `
        <button class="pagination__button" id="prevPageBtn" ${currentPage === 1 ? 'disabled' : ''}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Önceki</span>
        </button>
        
        <div class="pagination__info">
            <span class="pagination__page-current">${currentPage}</span> / ${totalPages}
        </div>
        
        <button class="pagination__button" id="nextPageBtn" ${currentPage === totalPages ? 'disabled' : ''}>
            <span>Sonraki</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        </button>
    `;

    document.getElementById('prevPageBtn')?.addEventListener('click', () => goToPage(currentPage - 1));
    document.getElementById('nextPageBtn')?.addEventListener('click', () => goToPage(currentPage + 1));
}

async function goToPage(page) {
    if (page < 1) return;
    currentPage = page;
    await performSearch(false); // false = yeni arama değil, sayfa değişimi
    
    // Sayfa değişiminde yukarı kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== MODAL =====

function openModal() {
    elements.movieModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    elements.movieModal.classList.add('hidden');
    document.body.style.overflow = '';
    elements.modalBody.innerHTML = '';
}

async function openMovieDetail(imdbID) {
    openModal();
    elements.modalBody.innerHTML = MovieView.createLoadingHtml();

    try {
        const result = await movieService.getMovieById(imdbID);

        if (result.success && result.data) {
            elements.modalBody.innerHTML = MovieView.createDetailHtml(result.data);
        } else {
            elements.modalBody.innerHTML = MovieView.createErrorHtml(
                result.message || 'Film detayı yüklenemedi'
            );
        }
    } catch (error) {
        console.error('Detay yükleme hatası:', error);
        elements.modalBody.innerHTML = MovieView.createErrorHtml(
            'Beklenmeyen bir hata oluştu'
        );
    }
}

// ===== ANA ARAMA =====

async function performSearch(isNewSearch = true) {
    // Eğer yeni arama ise (buton/Enter), input'tan al
    if (isNewSearch) {
        const searchTerm = elements.searchInput.value.trim();
        const type = elements.typeFilter.value || null;

        if (!searchTerm) {
            showMessage('Lütfen bir film adı girin', 'error');
            return;
        }

        if (searchTerm.length < 2) {
            showMessage('Arama terimi en az 2 karakter olmalı', 'error');
            return;
        }

        // Yeni arama → state'i resetle
        currentSearchTerm = searchTerm;
        currentType = type;
        currentPage = 1;
    }

    setLoading(true);

    try {
        const result = await movieService.searchMovies(currentSearchTerm, currentType, currentPage);

        setLoading(false);

        if (result.success) {
            currentMovies = result.data.movies;
            currentTotalResults = result.data.totalResults;

            renderMovies(currentMovies, currentTotalResults);
            
            if (isNewSearch) {
                showMessage(`${currentTotalResults} sonuç bulundu`, 'success');
            }

            saveCurrentSearchToStorage();

        } else {
            elements.moviesContainer.innerHTML = '';
            elements.resultsInfo.classList.add('hidden');
            elements.paginationArea.classList.add('hidden');
            showMessage(result.message, 'error');
        }
    } catch (error) {
        setLoading(false);
        showMessage('Beklenmeyen bir hata oluştu', 'error');
        console.error(error);
    }
}

// ===== LOCALSTORAGE =====

function saveCurrentSearchToStorage() {
    const moviesData = currentMovies.map(m => ({
        imdbID: m.imdbID,
        title: m.title,
        year: m.year,
        type: m.type,
        poster: m.poster
    }));

    StorageHelper.saveLastSearch(currentSearchTerm, currentType, {
        movies: moviesData,
        totalResults: currentTotalResults,
        page: currentPage
    });
}

function loadLastSearchFromStorage() {
    const lastSearch = StorageHelper.getLastSearch();

    if (!lastSearch) return;

    elements.searchInput.value = lastSearch.searchTerm;
    if (lastSearch.type) {
        elements.typeFilter.value = lastSearch.type;
    }

    if (lastSearch.results && lastSearch.results.movies) {
        const movies = lastSearch.results.movies.map(m => new MovieDto(m));
        currentMovies = movies;
        currentTotalResults = lastSearch.results.totalResults;
        currentSearchTerm = lastSearch.searchTerm;
        currentType = lastSearch.type;
        currentPage = lastSearch.results.page || 1;

        renderMovies(currentMovies, currentTotalResults);

        showMessage(
            `Önceki arama yüklendi: "${lastSearch.searchTerm}"`,
            'info'
        );
    }
}

// ===== INIT =====

document.addEventListener('DOMContentLoaded', () => {
    console.log('CineSearch başlatıldı');

    elements.searchButton.addEventListener('click', () => performSearch(true));
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch(true);
    });

    elements.modalClose.addEventListener('click', closeModal);
    elements.modalOverlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !elements.movieModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('omdb_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('omdb_theme', newTheme);
    });

    loadLastSearchFromStorage();

    elements.searchInput.focus();
});