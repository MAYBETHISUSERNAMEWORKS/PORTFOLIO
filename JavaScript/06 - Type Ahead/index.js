
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    // Spread the fetched data into the cities array
    cities.push(...data);
  });
const findMatches = (wordToMatch, cities) => {
  return cities.filter(place => {
    // figure out if the cittie or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
};

const displayMatches = (event) => {
  // console.log(event.target.value);
  const matchArray = findMatches(event.target.value, cities);
  // console.log(matchArray);
  const html = matchArray.map(place => {
    const regex = new RegExp(event.target.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${event.target.value}</span>`)
    const stateName = place.state.replace(regex, `<span class="hl">${event.target.value}</span>`)

    return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${place.population.toLocaleString()}</span>
        </li>
      `;
  }).join('');
  suggestions.innerHTML = html
};

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
