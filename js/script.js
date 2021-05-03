/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

//Declaring the number of items to see on a page
const itemsPerPage = 9;

//Calling the function to add a search bar and selecting necessary elements
const header = document.querySelector('header');
addSearchBar();
const input = document.querySelector('input#search');
const searchButton = document.querySelector('label button');

//Calling the main functions to show the page and add pagination
showPage(data, 1);
addPagination(data);

//This function uses a data set (list) and a page number (page) to create HTML elements and append them to index.html
function showPage(list, page) {
   const startIndex = (page - 1) * itemsPerPage;
   let endIndex = page * itemsPerPage;
   if (endIndex > list.length) {
      endIndex = list.length;
   }
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';
   for (let i = startIndex; i < endIndex; i++) {
      if (i >= startIndex && i < endIndex) {
         const html =  `<li class="student-item cf">
                     <div class="student-details">
                     <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                     <h3>${list[i].name.first} ${list[i].name.last}</h3>
                     <span class="email">${list[i].email}</span>
                     </div>
                     <div class="joined-details">
                     <span class="date">Joined ${list[i].registered.date}
                     </div>
                     </li>`;
         studentList.insertAdjacentHTML('beforeend', html);
      }
   }
   if (list.length == 0) {
      studentList.innerHTML += '<h3>Uh Oh!  There are no results found!!! Try again!</h3>';
   }
}

//This function add page buttons as well as the ability to move to different pages
function addPagination(list) {
   const numberOfButtons = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector('ul.link-list');
   if (list.length > 0) {
      linkList.innerHTML = '';
      for (let i = 1; i <= numberOfButtons; i++) {
         const li = document.createElement('li');
         const button = document.createElement('button');
         button.textContent = i;
         li.appendChild(button);
         linkList.insertAdjacentElement('beforeend', li);
      }
      let currentPageButton = document.querySelector('ul.link-list li button');
      currentPageButton.className = 'active';
      linkList.addEventListener('click', (e) => {
         currentPageButton.classList.remove('active');
         currentPageButton = e.target;
         currentPageButton.className = 'active';
         showPage(list, currentPageButton.textContent);
      });
   } else {
      linkList.innerHTML = '';
   }
}

//This function adds the search bar HTML to index.html
function addSearchBar() {
   header.innerHTML += `<label for="search" class="student-search">
                     <span>Search by name</span>
                     <input id="search" placeholder="Search by name...">
                     <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                     </label>`;
}

//This function adds searchability of names, taking in a data set (list) and returning a subset list that include the desired text
function searchList(list) {
   const nameList = [];
   searchInput = input.value.toUpperCase();
   for (let i = 0; i < list.length; i++) {
      const names = (list[i].name.first + " " + list[i].name.last).toUpperCase();
      if (names.includes(searchInput)) {
         nameList.push(list[i]);
      }
   }
   showPage(nameList, 1);
   addPagination(nameList);
}

//This event listener updates the page when text is typed into the search bar
input.addEventListener('input', () => {
   if (input.value) {
      searchList(data);
   } else {
      showPage(data, 1);
      addPagination(data);
   }
});

//This event listener updates the page when the search button is pressed
searchButton.addEventListener('click', () => {
   if (input.value) {
      searchList(data);
   } else {
      alert("You didn't enter any text! Try again!");
   }
});