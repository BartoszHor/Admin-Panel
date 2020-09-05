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

function openCloseSidebar() {
  if(screen.width < 750) {
    return;
  } else {
    const sidebar = document.querySelector('.sidebar');
    if(sidebar.style.display == 'block') {
      sidebar.style.display = 'none';
    } else {
      sidebar.style.display = 'block';
    }
  }
}

const sidebarIcon = document.querySelector('.icon-arrow-right');
sidebarIcon.addEventListener('click', openCloseSidebar);

const closeIcon = document.querySelector('.icon-close');
closeIcon.addEventListener('click', openCloseSidebar);
