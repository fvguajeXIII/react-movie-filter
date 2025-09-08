
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
    <div className="container py-4">
      <h1 className="mb-4 text-center">React Movie Filter</h1>
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <label htmlFor="genre-select" className="form-label">Filtra per genere:</label>
          <select
            id="genre-select"
            className="form-select"
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="search-title" className="form-label">Cerca per titolo:</label>
          <input
            id="search-title"
            type="text"
            className="form-control"
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
            placeholder="Inserisci titolo..."
          />
        </div>
      </div>
      <form className="card card-body mb-4" onSubmit={handleAddMovie}>
        <h2 className="h5 mb-3">Aggiungi nuovo film</h2>
        <div className="row g-2 align-items-center">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Titolo"
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              value={newGenre}
              onChange={e => setNewGenre(e.target.value)}
              placeholder="Genere"
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Aggiungi
            </button>
          </div>
        </div>
      </form>
      <ul className="list-group movie-list">
        {filteredMovies.length === 0 ? (
          <li className="list-group-item">Nessun film trovato.</li>
        ) : (
          filteredMovies.map((movie, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
              <strong>{movie.title}</strong>
              <span className="badge bg-secondary">{movie.genre}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
