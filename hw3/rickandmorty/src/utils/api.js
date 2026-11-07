const BASE_URL = 'https://rickandmortyapi.com/api';

// Get all the results from a paginated API endpoint
export async function fetchAll(endpoint, signal) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, { signal });

  if (!response.ok) {
    throw new Error('Could not load API data.');
  }

  const data = await response.json();
  const results = [...data.results];

  // The first request tells us how many pages there are
  const requests = [];

  for (let page = 2; page <= data.info.pages; page += 1) {
    requests.push(fetch(`${BASE_URL}/${endpoint}?page=${page}`, { signal }));
  }

  const responses = await Promise.all(requests);

  for (const pageResponse of responses) {
    if (!pageResponse.ok) {
      throw new Error('Could not load API data.');
    }

    const pageData = await pageResponse.json();
    results.push(...pageData.results);
  }

  return results;
}
