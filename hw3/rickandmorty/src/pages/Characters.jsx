import { useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadCharacters() {
      try {
        // Request characters 1 through 100.
        const ids = Array.from({ length: 100 }, (_, index) => index + 1);
        const url = `https://rickandmortyapi.com/api/character/${ids.join(',')}`;

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Could not load characters.');
        }

        const data = await response.json();
        setCharacters(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Could not load characters.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCharacters();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p>Loading characters...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section>
      <h1>First 100 Characters</h1>

      <div className="character-grid">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </section>
  );
}

export default Characters;
