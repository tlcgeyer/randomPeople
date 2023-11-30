// async function getData() {
//     let data = await fetch('https://randomuser.me/api?results=50')
//     return data.json()
// }
// async function display() {
//     let cardContainer = document.querySelector('[data-cards]') 
//     cardContainer.innerHTML = ''
//     let {results} = await getData()
//     results.forEach( people => {
//         cardContainer.innerHTML += `
//         <div class="card" style="width: 18rem;">
//             <img src="${people.picture.large}" class="card-img-top img-fluid" alt="${people.name.first}">
//             <div class="card-body">
//             <h5 class="card-title">${people.name.title}. ${people.name.first} ${people.name.last}</h5>
//             <p class="card-text">Age: ${people.registered.age}</p>
//         </div>
//         `
//     })
// }
// display()
// Mock data for random people
  async function getData() {
    let data = await fetch('https://randomuser.me/api?results=50');
    return data.json();
  }
  
  async function display(ascending = true) {
    let cardContainer = document.querySelector('[data-cards]');
    cardContainer.innerHTML = '';
  
    let { results } = await getData();
  
    // Sort the results based on the name
    results.sort((a, b) => {
      const nameA = `${a.name.title} ${a.name.first} ${a.name.last}`;
      const nameB = `${b.name.title} ${b.name.first} ${b.name.last}`;
  
      return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  
    results.forEach((people) => {
      cardContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
          <img src="${people.picture.large}" class="card-img-top img-fluid" alt="${people.name.first}">
          <div class="card-body">
            <h5 class="card-title">${people.name.title}. ${people.name.first} ${people.name.last}</h5>
            <p class="card-text">Age: ${people.registered.age}</p>
          </div>
        </div>
      `;
    });
  }
  
  async function displayPeople(searchTerm) {
    return new Promise(async (resolve, reject) => {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';
  
      if (searchTerm === '') {
        await display(); // Display all people when the search term is empty
        resolve(); // Resolve without any specific result when the search term is empty
      } else {
        const filteredPeople = people.filter((person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
  
        if (filteredPeople.length > 0) {
          filteredPeople.forEach((person) => {
            const personDiv = document.createElement('div');
            personDiv.textContent = person.name;
            resultsContainer.appendChild(personDiv);
          });
          resolve(); // Resolve when results are found
        } else {
          resultsContainer.textContent = 'Name not found.';
          reject(); // Reject when the name is not found
        }
      }
    });
  }
  
  document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.trim();
    displayPeople(searchTerm)
      .then(() => console.log('Search successful'))
      .catch(() => console.log('Name not found'));
  });
  
  // Toggle button for sorting
  const toggleButton = document.getElementById('toggleButton');
  let ascendingOrder = true;
  
  toggleButton.addEventListener('click', function () {
    ascendingOrder = !ascendingOrder;
    display(ascendingOrder);
  });
  