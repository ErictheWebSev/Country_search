

document.addEventListener('DOMContentLoaded', function() {
    fetchCountry();
    const searchButton = document.getElementById('searchButton');
    const searchBox = document.getElementById('searchInput');
    searchButton.addEventListener('click', performSearch);
    
    searchBox.addEventListener('keyup', (e) => {
      console.log(e.target.value);
      if (e.code == "Enter") {
        performSearch();
      } else if (e.code == "Backspace") {
        performSearch();
    	} else {
    	  console.log('enter a query');
    	}
  });
});

function fetchCountry() {
  showLoader();
  fetch('https://restcountries.com/v3/all/')
  .then(response => response.json())
  .then(countries => {
    hideLoader();
    const countryContainer = document.getElementById('countryContainer')
    countries.forEach(country => {
      console.log(country)
      const countryDiv = document.createElement('div');
      countryDiv.classList.add('cards');
  
      const flagImg = document.createElement('img');
      flagImg.src = country.flags[0];
      flagImg.alt = `${country.name.common} flag`;
      flagImg.classList.add('image')

      const countryName = document.createElement('h2');
      countryName.classList.add('h2');
      countryName.textContent = country.name.common;

        const population = document.createElement('p');
        population.classList.add('p');
        population.textContent = `Population: ${country.population}`;

        const independence = document.createElement('p');
        independence.classList.add('p');

        independence.textContent = `Independence: ${country.independent ? 'True' : 'False'}`;
        
        const region = document.createElement('p');
        region.classList.add('p');
        region.textContent = `Continent: ${country.continents[0]}`;
        
        
      countryDiv.appendChild(flagImg);
      countryDiv.appendChild(countryName);
      countryDiv.appendChild(population);
      countryDiv.appendChild(independence);
      countryDiv.appendChild(region);
      countryContainer.appendChild(countryDiv);
    })
  })
   .catch(error => {
     hideLoader();
        // If there's an error while fetching data or processing it, this part runs.
        console.error('Error:', error);
      });
}

function performSearch() {
  const searchInput = document.getElementById('searchInput');
  console.log(searchInput.value);
  const searchTerm = searchInput.value.toLowerCase();
  showLoader();
  fetch('https://restcountries.com/v3/all/')
  .then(response => response.json())
  .then(countries => {
    hideLoader();
    const countryContainer = document.getElementById('countryContainer');
    //clear previous results
    countryContainer.innerHTML = '';
    
    const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(searchTerm) || country.name.common.toLowerCase().startsWith(searchTerm);
    });
    
    if (filteredCountries.length === 0) {
            alert(`No countries found for "${searchTerm}"`);
            return;
        }
    
    filteredCountries.forEach(country => {
      console.log(country.name.common)
      const countryDiv = document.createElement('div');
      countryDiv.classList.add('cards');
      
      const flagImg = document.createElement('img');
      flagImg.src = country.flags[0];
      flagImg.alt = `${country.name.common} flag`;
      flagImg.classList.add('image')
      
      const countryName = document.createElement('h2');
      countryName.classList.add('h2');
      countryName.textContent = country.name.common;
      
      const population = document.createElement('p');
      population.classList.add('p');
      population.textContent = `Population: ${country.population}`;
      
      const independence = document.createElement('p');
      independence.classList.add('p');
      
      independence.textContent = `Independence: ${country.independent ? 'True' : 'False'}`;
      
      const region = document.createElement('p');
      region.classList.add('p');
      region.textContent = `Continent: ${country.continents[0]}`;
      
      
      countryDiv.appendChild(flagImg);
      countryDiv.appendChild(countryName);
      countryDiv.appendChild(population);
      countryDiv.appendChild(independence);
      countryDiv.appendChild(region);
      countryContainer.appendChild(countryDiv);
      
    })
  })
  .catch (error => {
    hideLoader();
    console.error('Error:', error);
  });
}

function showLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
}

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}