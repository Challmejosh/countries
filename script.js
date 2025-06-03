document.addEventListener('DOMContentLoaded', () => {
  const countryGrid = document.getElementById('countryGrid');
  const searchInput = document.getElementById('searchInput');
  const regionSelect = document.getElementById('regionSelect');
  let countries = [];
  let filteredCountries = [];

  // Fetch countries data
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      countries = data;
      filteredCountries = countries;
      renderCountries(filteredCountries);
      populateRegions(countries);
    });

  // Render country cards
  function renderCountries(list) {
    countryGrid.innerHTML = '';
    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'country-card';
      card.innerHTML = `
        <img src="${item.flags.png}" alt="${item.name} flag" class="country-flag" />
        <div class="country-info">
          <p class="country-name">${item.name}</p>
          <a href="detail.html?country=${encodeURIComponent(item.name)}" class="country-link">
            <p>Population: ${item.population.toLocaleString()}</p>
            <p>Region: ${item.region}</p>
            <p>Capital: ${item.capital}</p>
          </a>
        </div>
      `;
      countryGrid.appendChild(card);
    });
  }

  // Populate region select
  function populateRegions(list) {
    const regions = Array.from(new Set(list.map(c => c.region))).filter(Boolean);
    regions.forEach(region => {
      const option = document.createElement('option');
      option.value = region;
      option.textContent = region;
      regionSelect.appendChild(option);
    });
  }

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    filteredCountries = countries.filter(c => c.name.toLowerCase().includes(value));
    if (regionSelect.value) {
      filteredCountries = filteredCountries.filter(c => c.region === regionSelect.value);
    }
    renderCountries(filteredCountries);
  });

  // Region filter functionality
  regionSelect.addEventListener('change', (e) => {
    const region = e.target.value;
    filteredCountries = countries;
    if (region) {
      filteredCountries = filteredCountries.filter(c => c.region === region);
    }
    if (searchInput.value) {
      filteredCountries = filteredCountries.filter(c => c.name.toLowerCase().includes(searchInput.value.toLowerCase()));
    }
    renderCountries(filteredCountries);
  });
});
