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

const datePickers = document.querySelectorAll('.datePicker')
for(let datePicker of datePickers){
  datePicker.value = formatDate(new Date())
}

