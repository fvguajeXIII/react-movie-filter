
import './App.css';
import { useState } from 'react';

const movies = [
  { title: 'Inception', genre: 'Fantascienza' },
  { title: 'Il Padrino', genre: 'Thriller' },
  { title: 'Titanic', genre: 'Romantico' },
  { title: 'Batman', genre: 'Azione' },
  { title: 'Interstellar', genre: 'Fantascienza' },
  { title: 'Pulp Fiction', genre: 'Thriller' },
];

const genres = ['Tutti', ...Array.from(new Set(movies.map(m => m.genre)))];

function App() {
  const [selectedGenre, setSelectedGenre] = useState('Tutti');

  const filteredMovies = selectedGenre === 'Tutti'
    ? movies
    : movies.filter(m => m.genre === selectedGenre);

  return (
    <div className="App">
      <h1>React Movie Filter</h1>
      <div className="filter-container">
        <label htmlFor="genre-select">Filtra per genere:</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <ul className="movie-list">
        {filteredMovies.length === 0 ? (
          <li>Nessun film trovato.</li>
        ) : (
          filteredMovies.map((movie, idx) => (
            <li key={idx}>
              <strong>{movie.title}</strong> <span>({movie.genre})</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
