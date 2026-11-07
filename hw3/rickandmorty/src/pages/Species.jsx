import { useEffect, useState } from 'react';
import { fetchAll } from '../utils/api';

function Species() {
  const [species, setSpecies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadSpecies() {
      try {
        const characters = await fetchAll('character', controller.signal);
        const groups = {};

        // Put each character into their species group.
        characters.forEach((character) => {
          if (!groups[character.species]) {
            groups[character.species] = [];
          }

          groups[character.species].push(character.name);
        });

        setSpecies(groups);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Could not load species.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadSpecies();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p>Loading species...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section>
      <h1>Characters by Species</h1>

      <div className="info-grid">
        {Object.entries(species).map(([name, characters]) => (
          <article className="info-card" key={name}>
            <h2>{name}</h2>
            <p>
              <strong>Total:</strong> {characters.length}
            </p>

            <ul>
              {characters.map((character, index) => (
                <li key={`${character}-${index}`}>{character}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Species;
