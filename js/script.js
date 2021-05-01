/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const itemsPerPage = 9;

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
}

function addPagination(list) {
   const numberOfButtons = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector('ul.link-list');
   linkList.innerHTML = '';
   for (let i = 1; i <= numberOfButtons; i++) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.textContent = i;
      li.appendChild(button);
      linkList.insertAdjacentElement('beforeend', li);
   }
   let currentPageButton = linkList.firstElementChild;
   currentPageButton.className = 'active';
   linkList.addEventListener('click', (e) => {
      currentPageButton.classList.remove('active');
      currentPageButton = e.target;
      currentPageButton.className = 'active';
      showPage(list, currentPageButton.textContent);
   });
}

showPage(data, 1);
addPagination(data);
