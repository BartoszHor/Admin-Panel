/* General - main page funactions */

document.querySelectorAll('.amount-list__item').forEach(function(item) {
  item.addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.js--amount').innerHTML = this.innerHTML;
  });
});

document.querySelector('.js--arrow-down').addEventListener('click', function(event) {
  document.querySelectorAll('.amount-list__item').forEach(function(item){
    item.classList.toggle('js--amount-open');
  });
});

const addDays = function(dateStr, days){
  const dateObj = new Date(dateStr);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

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

const datePickers = document.querySelectorAll(`input[name="date"]`);
for(let datePicker of datePickers){
  datePicker.value = formatDate(new Date());
  let minDate = new Date();
  let maxDate = addDays(minDate, 21);
  // eslint-disable-next-line no-undef
  flatpickr(datePicker, {
    defaultDate: minDate,
    minDate: minDate,
    maxDate: maxDate,
    locale: {
      firstDayOfWeek: 1
    },
    disable: [
      function(date) {
        return (date.getDay() === 0 || date.getDay() === 6);

      }
    ],
    onChange: function(selectedDates, dateStr) {
      // eslint-disable-next-line no-undef
      value = dateStr;
    },
  });
}

function activatePage(pageId) {
  let mainPages = document.querySelectorAll('.main-wrapper');
  for (let page of mainPages) {
    if (page.getAttribute('data-id') == pageId) {
      page.classList.add('active');
    }
  }
}

function initPage() {
  let pages = document.querySelectorAll('.main-wrapper');
  const idFromHash = window.location.hash.replace('#', '');
  let pageMatchingHash = pages[0].getAttribute('data-id');
  for (let page of pages) {
    if(page.getAttribute('data-id') == idFromHash){
      pageMatchingHash = page.getAttribute('data-id');
      break;
    }
  }
  activatePage(pageMatchingHash);
}
initPage();

function mixOrder(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

document.querySelectorAll('.icon-refresh').forEach(function(icon) {
  icon.addEventListener('click', function() {
    document.querySelectorAll(`input[name="date"]`).forEach(function(input){
      input.value = formatDate(new Date());
    });
    const table = document.querySelector('.table-mix');
    const tableRows = document.querySelector('.table-xl').getElementsByTagName('tr');
    let rows = Array.from(tableRows).slice(1);
    mixOrder(rows);
    for (let row of rows) {
      table.appendChild(row);
      row.classList.add('tr-style');
      row.classList.add('table-xl');
      row.querySelectorAll('td').forEach(function(td) {
        td.style.textAlign = 'center';
      });
    }
  });
});

/* Modal functions */

function closeModal() {
  document.getElementById('overlay').classList.remove('show');
}

document.querySelectorAll('#overlay .js--close-modal').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    closeModal();
  });
});

document.querySelector('#overlay').addEventListener('click', function(e) {
  if(e.target === this) {
    closeModal();
  }
});

document.addEventListener('keyup', function(e) {
  if (e.key == 'Escape') {
    closeModal();
  }
});

function modalOpener(modal) {

  document.querySelectorAll('#overlay > *').forEach(function(modal) {
    modal.classList.remove('show');
  });
  document.querySelector('#overlay').classList.add('show');
  document.querySelector(modal).classList.add('show');
}

document.querySelector('.js--manager').addEventListener('click', function(){
  modalOpener('#myModal');
});

const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('focus', function() {
  document.querySelector('.icon-message').classList.add('hide');
  this.placeholder = '';
});

searchInput.addEventListener('blur', function() {
  document.querySelector('.icon-message.hide').classList.remove('hide');
  this.placeholder = 'Enter Your msg';
});


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
// eslint-disable-next-line no-unused-vars
function showSidebar() {
  let size = document.body.clientWidth;
  if (size >= 737) {
    let sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'block';
  }
}
document.body.addEventListener('resize', showSidebar);

const sidebarIcon = document.querySelector('.icon-arrow-right');
sidebarIcon.addEventListener('click', openCloseSidebar);

const closeIcon = document.querySelector('.icon-close');
closeIcon.addEventListener('click', openCloseSidebar);


function pickSection(event) {
  event.preventDefault();
  const clickedElement = this;
  let mainSections = document.querySelectorAll('.main-wrapper');
  for (let section of mainSections) {
    section.classList.toggle('active', section.getAttribute('data-id') == clickedElement.getAttribute('href').replace('#', ''));
    window.location.hash = clickedElement.id;
  }
}

function sidebarListeners() {
  let sidebarLinks = document.querySelectorAll('.sidebar__list__item a');
  for (let link of sidebarLinks) {
    link.addEventListener('click', pickSection);
  }
}
sidebarListeners();

/* Chart */

let ctx = document.getElementById('myChart').getContext('2d');
// eslint-disable-next-line
let chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
    datasets: [{
      label: 'Signups',
      backgroundColor: '#8DBEC8',
      borderColor: '#8DBEC8',
      data: [ 52, 51, 41, 94, 26, 6, 72, 9, 21, 88 ],
    },
    {
      label: 'FTD',
      backgroundColor: '#F29E4E',
      borderColor: '#F29E4E',
      data: [ 6, 72, 1, 0, 47, 11, 50, 44, 63, 76 ],
    },
    {
      label: 'Earned',
      backgroundColor: '#71B374',
      borderColor: '#71B374',
      data: [ 59, 49, 68, 90, 67, 41, 13, 38, 48, 48 ],

    }]
  },
  options: {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 20
      }
    },
    legend: {
      reverse: true,
      labels: {
        boxWidth: 15,
        fontSize: 15,
      }
    }
  }
});


