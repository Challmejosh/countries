document.addEventListener('DOMContentLoaded', () => {
  // Get country name from query string
  const params = new URLSearchParams(window.location.search);
  const countryName = decodeURIComponent(params.get('country'));

  if (!countryName) {
    document.body.innerHTML = '<h2>No country selected.</h2>';
    return;
  }

  // Fetch country data
  fetch('../data.json')
    .then(res => res.json())
    .then(data => {
      const country = data.find(c => c.name === countryName);
      if (!country) {
        document.body.innerHTML = '<h2>Country not found</h2>';
        return;
      }
      renderCountryDetail(country);
    });

  function renderCountryDetail(country) {
    const content = document.querySelector('.content');
    content.innerHTML = `
      <div style="width:100%; display: flex; align-items:center; jsutify-content: start; " >
        <div onclick="window.history.back()" style="width: 100px;background: transparent; height: 40px;display: flex;align-items: center;justify-content: center;border-radius: 4px;cursor:pointer;box-shadow: 0 1px 4px rgba(0,0,0,0.08);border: 2px solid #e0e0e0;margin-bottom: 1.5rem;">
            <button class="back-btn" style="background: transparent;border: none;font-size: 1rem,text-transform: capitalize;cursor: pointer">
                back
            </button>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:2rem;align-items:start;justify-content:center;">
        <img src="${country.flags.png}" alt="${country.name} flag" style="width:420px;max-width:100%;box-shadow:0 2px 8px rgba(0,0,0,0.08);border-radius:4px;" />
        <div style="display: flex; align-items: start; justify-content: start; ">
            <div className="">
                <h2 style="margin-top:0;">${country.name}</h2>
                <p><strong>Native Name:</strong> ${country.nativeName}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Sub Region:</strong> ${country.subregion}</p>
                <p><strong>Capital:</strong> ${country.capital}</p>
            </div>
            <div className="">
                <p><strong>Top Level Domain:</strong> ${country.topLevelDomain.join(', ')}</p>
                <p><strong>Currencies:</strong> ${country.currencies.map(c => c.name + ' (' + c.symbol + ')').join(', ')}</p>
                <p><strong>Languages:</strong> ${country.languages.map(l => l.name).join(', ')}</p>
            </div>
        </div>
      </div>
    `;
  }
});
