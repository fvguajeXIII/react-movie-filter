
import './App.css';
import { useState, useEffect } from 'react';

const initialMovies = [
  { title: 'Inception', genre: 'Fantascienza' },
  { title: 'Il Padrino', genre: 'Thriller' },
  { title: 'Titanic', genre: 'Romantico' },
  { title: 'Batman', genre: 'Azione' },
  { title: 'Interstellar', genre: 'Fantascienza' },
  { title: 'Pulp Fiction', genre: 'Thriller' },
];

function getGenres(movies) {
  return ['Tutti', ...Array.from(new Set(movies.map(m => m.genre)))];
}

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [selectedGenre, setSelectedGenre] = useState('Tutti');
  const [searchTitle, setSearchTitle] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('');

  useEffect(() => {
    let result = movies;
    if (selectedGenre !== 'Tutti') {
      result = result.filter(m => m.genre === selectedGenre);
    }
    if (searchTitle.trim() !== '') {
      result = result.filter(m => m.title.toLowerCase().includes(searchTitle.trim().toLowerCase()));
    }
    setFilteredMovies(result);
  }, [movies, selectedGenre, searchTitle]);

  const genres = getGenres(movies);

  function handleAddMovie(e) {
    e.preventDefault();
    const title = newTitle.trim();
    const genre = newGenre.trim();
    if (!title || !genre) return;
    setMovies([...movies, { title, genre }]);
    setNewTitle('');
    setNewGenre('');
  }

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
      <div className="search-container" style={{ marginBottom: '20px' }}>
        <label htmlFor="search-title">Cerca per titolo:</label>
        <input
          id="search-title"
          type="text"
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
          placeholder="Inserisci titolo..."
          style={{ marginLeft: '8px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <form className="add-movie-form" onSubmit={handleAddMovie} style={{ marginBottom: '24px' }}>
        <h2>Aggiungi nuovo film</h2>
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Titolo"
          style={{ marginRight: '8px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          value={newGenre}
          onChange={e => setNewGenre(e.target.value)}
          placeholder="Genere"
          style={{ marginRight: '8px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '4px 12px', borderRadius: '4px', border: 'none', background: '#1976d2', color: '#fff' }}>
          Aggiungi
        </button>
      </form>
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
