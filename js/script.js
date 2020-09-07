/* General - main page funactions */

function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const datePickers = document.querySelectorAll('.datePicker');
for(let datePicker of datePickers){
  datePicker.value = formatDate(new Date());
}

function activatePage() {
  let mainPages = document.querySelectorAll('.main-wrapper')
  for (let page of mainPages) {
    if (page.id == 1) {
      page.classList.add('active')
    }
  }
}
activatePage()

/* Sidebar functions */

function openCloseSidebar() {
  let sidebar = document.querySelector('.sidebar');
  if (sidebar.style.display == 'block') {
    sidebar.style.display = 'none';
    let size = document.body.clientWidth;
    if (size >= 737) {
      sidebar.style.display = 'block';
    }
  } else {
    sidebar.style.display = 'block';
  }
}

function showSidebar() {
  let size = document.body.clientWidth;
  if (size >= 737) {
    let sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'block';
  }
}

const sidebarIcon = document.querySelector('.icon-arrow-right');
sidebarIcon.addEventListener('click', openCloseSidebar);

const closeIcon = document.querySelector('.icon-close');
closeIcon.addEventListener('click', openCloseSidebar);


function pickSection(event) {
event.preventDefault();
const clickedElement = this
let mainSections = document.querySelectorAll('.main-wrapper')
for (let section of mainSections) {
    section.classList.toggle('active', section.id == clickedElement.id)
  }
}

function sidebarListeners() {
  let sidebarLinks = document.querySelectorAll('.sidebar__list__item a')
  for (let link of sidebarLinks) {
    link.addEventListener('click', pickSection)
  }
}
sidebarListeners()
