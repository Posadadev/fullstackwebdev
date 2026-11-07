import { useEffect, useState } from 'react';
import { fetchAll } from '../utils/api';

function Locations() {
  const [locations, setLocations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadLocations() {
      try {
        const data = await fetchAll('location', controller.signal);
        const counts = {};

        // Count how many locations belong to each type.
        data.forEach((location) => {
          const { type } = location;
          counts[type] = (counts[type] || 0) + 1;
        });

        setLocations(counts);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Could not load locations.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLocations();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p>Loading locations...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section>
      <h1>Locations by Type</h1>

      <div className="info-grid">
        {Object.entries(locations).map(([type, count]) => (
          <article className="info-card" key={type}>
            <h2>{type}</h2>
            <p>
              <strong>Total Locations:</strong> {count}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Locations;
