// MovieView - Film detayını HTML'e çeviren sınıf
export class MovieView {
    static createDetailHtml(movie) {
        const posterHtml = movie.hasPoster()
            ? `<img src="${movie.poster}" alt="${movie.title}" class="movie-detail__poster" 
                  onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 450%22><rect fill=%22%23ddd%22 width=%22300%22 height=%22450%22/><text x=%22150%22 y=%22225%22 text-anchor=%22middle%22 font-size=%2240%22 fill=%22%23999%22>NO IMAGE</text></svg>'">`
            : `<div class="movie-detail__poster movie-card__poster--placeholder" 
                   style="height: 450px; display: flex; align-items: center; justify-content: center;">
                   <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
                       <rect x="2" y="3" width="20" height="18" rx="2" ry="2"/>
                       <line x1="8" y1="3" x2="8" y2="21"/>
                       <line x1="16" y1="3" x2="16" y2="21"/>
                   </svg>
               </div>`;

        const ratingHtml = (movie.imdbRating && movie.imdbRating !== 'N/A')
            ? `<div class="movie-detail__rating">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                   </svg>
                   IMDb ${movie.imdbRating}/10 (${movie.imdbVotes || '0'} oy)
               </div>`
            : '';

        // Detay alanları (emojisiz, sadece labelled)
        const fields = [
            { label: 'Tür', value: movie.genre },
            { label: 'Yönetmen', value: movie.director },
            { label: 'Senarist', value: movie.writer },
            { label: 'Oyuncular', value: movie.actors },
            { label: 'Süre', value: movie.runtime },
            { label: 'Çıkış Tarihi', value: movie.released },
            { label: 'Ülke', value: movie.country },
            { label: 'Dil', value: movie.language },
            { label: 'Ödüller', value: movie.awards }
        ];

        const fieldsHtml = fields
            .filter(f => f.value && f.value !== 'N/A')
            .map(f => `
                <div class="movie-detail__field">
                    <strong>${f.label}</strong>
                    ${f.value}
                </div>
            `)
            .join('');

        const plotHtml = (movie.plot && movie.plot !== 'N/A')
            ? `<p class="movie-detail__plot">${movie.plot}</p>`
            : '';

        return `
            <div class="movie-detail">
                <div>
                    ${posterHtml}
                </div>
                <div>
                    <h2 class="movie-detail__title">${movie.title}</h2>
                    <p class="movie-detail__year">
                        ${movie.year} &middot; ${movie.getDisplayType()}
                    </p>
                    ${ratingHtml}
                    ${plotHtml}
                    <div class="movie-detail__info">
                        ${fieldsHtml}
                    </div>
                </div>
            </div>
        `;
    }

    static createLoadingHtml() {
        return `
            <div style="text-align: center; padding: 80px 20px;">
                <div class="loading__spinner" style="display: inline-flex; gap: 10px; margin-bottom: 20px;">
                    <div class="loading__circle"></div>
                    <div class="loading__circle"></div>
                    <div class="loading__circle"></div>
                </div>
                <p style="color: var(--text-secondary);">Film detayı yükleniyor...</p>
            </div>
        `;
    }

    static createErrorHtml(message) {
        return `
            <div style="text-align: center; padding: 80px 20px;">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--error)" stroke-width="1.5" style="margin-bottom: 20px;">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p style="font-size: 1.1rem; color: var(--text-primary);">${message}</p>
            </div>
        `;
    }
}