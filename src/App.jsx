import React, { useState } from 'react';
import MovieList from './MovieList';
import './App.css';

const INITIAL_MOVIES = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Sci-Fi',
    year: 2010,
    rating: 8.8,
    duration: '2 სთ 28 წთ',
    director: 'Christopher Nolan',
    cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    description: 'დომ კობი არის ოსტატი ქურდი, რომელიც იპარავს ღირებულ საიდუმლოებებს ქვეცნობიერის სიღრმიდან სიზმრის დროს. მას ეძლევა შანსი დაიბრუნოს თავისი ძველი ცხოვრება, თუ შეძლებს შეუძლებელს: იდეის ჩანერგვას (Inception).'
  },
  {
    id: 2,
    title: 'Interstellar',
    genre: 'Sci-Fi',
    year: 2014,
    rating: 8.7,
    duration: '2 სთ 49 წთ',
    director: 'Christopher Nolan',
    cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    description: 'დედამიწის რესურსების ამოწურვის შემდეგ, მკვლევართა გუნდი იყენებს ახლად აღმოჩენილ ჭიის ხვრელს (Wormhole), რათა კაცობრიობის გადასარჩენად ახალი საცხოვრებელი პლანეტა იპოვოს.'
  },
  {
    id: 3,
    title: 'The Godfather',
    genre: 'Drama',
    year: 1972,
    rating: 9.2,
    duration: '2 სთ 55 წთ',
    director: 'Francis Ford Coppola',
    cast: 'Marlon Brando, Al Pacino, James Caan',
    poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&auto=format&fit=crop&q=80',
    description: 'იტალიურ-ამერიკული მაფიოზური ოჯახის, კორლეონეების დრამატული ისტორია. ოჯახის პატრიარქი ვიტო კორლეონე ძალაუფლებას თავის უმცროს შვილს, მაიკლს გადასცემს.'
  },
  {
    id: 4,
    title: 'The Dark Knight',
    genre: 'Action',
    year: 2008,
    rating: 9.0,
    duration: '2 სთ 32 წთ',
    director: 'Christopher Nolan',
    cast: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&auto=format&fit=crop&q=80',
    description: 'როდესაც გოთემს ქაოსში ახვევს იდუმალი და შეშლილი ბოროტმოქმედი ჯოკერი, ბეტმენი იძულებულია თავისი შესაძლებლობების ზღვარს გასცდეს სამართლიანობის დასაცავად.'
  },
  {
    id: 5,
    title: 'Pulp Fiction',
    genre: 'Crime',
    year: 1994,
    rating: 8.9,
    duration: '2 სთ 34 წთ',
    director: 'Quentin Tarantino',
    cast: 'John Travolta, Uma Thurman, Samuel L. Jackson',
    poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&auto=format&fit=crop&q=80',
    description: 'ლოს-ანჯელესის კრიმინალური სამყაროს რამდენიმე გადახლართული ისტორია, სავსე უნიკალური დიალოგებით, მოულოდნელი იუმორითა და დაძაბული სიუჟეტებით.'
  },
  {
    id: 6,
    title: 'Fight Club',
    genre: 'Drama',
    year: 1999,
    rating: 8.8,
    duration: '2 სთ 19 წთ',
    director: 'David Fincher',
    cast: 'Brad Pitt, Edward Norton, Helena Bonham Carter',
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80',
    description: 'ინსომნიით დატანჯული ოფისის თანამშრომელი ხვდება საპნის ქარიზმატულ გამყიდველ ტაილერ დერდენს და მასთან ერთად საიდუმლო მიწისქვეშა მებრძოლთა კლუბს აარსებს.'
  }
];

function App() {
  const [movies] = useState(INITIAL_MOVIES);
  const [searchTerm, setSearchTerm] = useState('');

  // რეალურ დროში ძებნა ფილმის სათაურის მიხედვით
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="app-container">
      {/* ჰედერი */}
      <header className="app-header">
        <div className="brand-badge">🎬 ფილმების სამყარო</div>
        <h1 className="app-title">ფილმების კატალოგი</h1>
        <p className="app-subtitle">
          აღმოაჩინე შენი საყვარელი ფილმები, გაეცანი დეტალებს და მოიძიე მარტივად
        </p>

        {/* საძიებო ინპუტი */}
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="მოძებნე ფილმი სათაურით (მაგ: Inception)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
                title="გასუფთავება"
                type="button"
              >
                ✕
              </button>
            )}
          </div>
          <div className="results-badge">
            ნაპოვნია: <strong>{filteredMovies.length}</strong> / {movies.length}
          </div>
        </div>
      </header>

      {/* ფილმების სია (props-ით გადაეცემა გაფილტრული მასივი) */}
      <main className="content-container">
        <MovieList movies={filteredMovies} onResetSearch={() => setSearchTerm('')} />
      </main>

      {/* ფუტერი */}
      <footer className="app-footer">
        <p>© 2026 ფილმების კატალოგი • შექმნილია React-ზე</p>
      </footer>
    </div>
  );
}

export default App;
