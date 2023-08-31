document.addEventListener('DOMContentLoaded', function() {
    fetchCountry();
    performSearch();
    
    const sortDropdown = document.getElementById('sortCriteria');
    sortDropdown.addEventListener('change', performSearch);
    
    const searchButton = document.getElementById('searchButton');
    const searchBox = document.getElementById('searchInput');
    searchButton.addEventListener('click', performSearch);
    
    searchBox.addEventListener('keyup', (e) => {
      console.log(e.target.value);
      if (e.target.value.length > 0) {
        console.log(e.target.value.length)
        performSearch()
      }
        
  });
  
  
});

function formatPopulation(population) {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function fetchCountry() {
  showLoader();
  fetch('https://restcountries.com/v3/all/')
  .then(response => response.json())
  .then(countries => {
    hideLoader();
    const countryContainer = document.getElementById('countryContainer')
    countries.forEach(country => {
      
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
        population.textContent = `Population: ${formatPopulation(country.population)}`;

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
  const sortCriteria = document.getElementById('sortCriteria').value; 
  const searchTerm = searchInput.value.trim().toLowerCase();
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
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.style.display = 'block';
        errorMsg.textContent = `No results for
        ${searchInput.value}...`;
         return;
        } else {
          errorMsg.style.display = 'none';
        }

    filteredCountries.sort((a, b) => {
      if (sortCriteria === 'name') {
        return a.name.common.localeCompare(b.name.common);
      } else if (sortCriteria === 'independence') {
        console.log(sortCriteria)
        return (a.independent ? -1 : 1) - (b.independent ? -1 : 1);
      } else if (sortCriteria === 'population') {
         return a.population - b.population;
      }
    });
    
    filteredCountries.forEach(country => {
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
      population.textContent = `Population: ${formatPopulation(country.population)}`;
      
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