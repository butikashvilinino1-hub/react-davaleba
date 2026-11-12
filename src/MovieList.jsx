import React, { useState, useEffect } from 'react';

function MovieList({ movies, onResetSearch }) {
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Escape კლავიშით მოდალის დახურვა და სქროლის დაბლოკვა მოდალის დროს
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedMovie(null);
            }
        };

        if (selectedMovie) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedMovie]);

    // თუ საძიებო შედეგი ცარიელია
    if (!movies || movies.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">🎞️</div>
                <h3>ფილმი ვერ მოიძებნა</h3>
                <p>თქვენი საძიებო მოთხოვნით ფილმი არ არსებობს. სცადეთ სხვა სათაური.</p>
                {onResetSearch && (
                    <button className="reset-search-btn" onClick={onResetSearch}>
                        ყველა ფილმის ნახვა
                    </button>
                )}
            </div>
        );
    }

    return (
        <>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <article
                        key={movie.id}
                        className="movie-card"
                        onClick={() => setSelectedMovie(movie)}
                    >
                        {/* პოსტერის სექცია */}
                        <div className="movie-poster-wrapper">
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="movie-poster"
                                loading="lazy"
                            />
                            <div className="poster-overlay">
                                <span className="view-details-pill">დეტალების ნახვა</span>
                            </div>
                            {movie.rating && (
                                <div className="rating-badge">
                                    <span>⭐</span> {movie.rating}
                                </div>
                            )}
                        </div>

                        {/* ინფორმაცია */}
                        <div className="movie-card-content">
                            <h3 className="movie-title">{movie.title}</h3>

                            <div className="movie-meta-tags">
                                <span className="meta-tag genre-tag">{movie.genre}</span>
                                <span className="meta-tag year-tag">{movie.year}</span>
                                {movie.duration && (
                                    <span className="meta-tag duration-tag">{movie.duration}</span>
                                )}
                            </div>

                            {movie.description && (
                                <p className="movie-short-desc">
                                    {movie.description.slice(0, 95)}...
                                </p>
                            )}

                            <button
                                type="button"
                                className="details-btn"
                                onClick={(e) => {
                                    e.stopPropagation(); // ხელს უშლის ბარათის ორმაგ კლიკს
                                    setSelectedMovie(movie);
                                }}
                            >
                                დეტალურად ➜
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            {/* დეტალური ინფორმაციის მოდალური ფანჯარა */}
            {selectedMovie && (
                <div
                    className="modal-backdrop"
                    onClick={() => setSelectedMovie(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()} // მოდალის შიგნით კლიკზე არ დაიხუროს
                    >
                        <button
                            className="modal-close-btn"
                            onClick={() => setSelectedMovie(null)}
                            aria-label="დახურვა"
                        >
                            ✕
                        </button>

                        <div className="modal-body">
                            <div className="modal-poster-col">
                                <img
                                    src={selectedMovie.poster}
                                    alt={selectedMovie.title}
                                    className="modal-poster"
                                />
                            </div>

                            <div className="modal-info-col">
                                <div className="modal-header">
                                    <h2 className="modal-title">{selectedMovie.title}</h2>
                                    <div className="modal-badges">
                                        <span className="modal-rating">⭐ {selectedMovie.rating || 'N/A'}</span>
                                        <span className="modal-pill">{selectedMovie.year}</span>
                                        <span className="modal-pill">{selectedMovie.genre}</span>
                                        {selectedMovie.duration && (
                                            <span className="modal-pill">{selectedMovie.duration}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-section">
                                    <h4>აღწერა / შინაარსი</h4>
                                    <p className="modal-description">
                                        {selectedMovie.description || 'აღწერა არ არის მითითებული.'}
                                    </p>
                                </div>

                                <div className="modal-details-grid">
                                    {selectedMovie.director && (
                                        <div className="detail-item">
                                            <span className="detail-label">🎬 რეჟისორი:</span>
                                            <span className="detail-value">{selectedMovie.director}</span>
                                        </div>
                                    )}

                                    {selectedMovie.cast && (
                                        <div className="detail-item">
                                            <span className="detail-label">👥 მსახიობები:</span>
                                            <span className="detail-value">{selectedMovie.cast}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="modal-actions">
                                    <button
                                        className="modal-action-btn primary"
                                        onClick={() => alert(`ფილმი "${selectedMovie.title}" დამატებულია რჩეულებში!`)}
                                    >
                                        ❤️ რჩეულებში დამატება
                                    </button>
                                    <button
                                        className="modal-action-btn secondary"
                                        onClick={() => setSelectedMovie(null)}
                                    >
                                        დახურვა
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MovieList;
