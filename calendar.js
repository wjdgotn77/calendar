const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

const shortCalendar = document.querySelectorAll('.short-calendar p');
const monthDate = document.querySelectorAll('tbody td');
const calendarTitle = document.querySelector('.calendar-title');

let date = new Date();
const displayYear = date.getFullYear();
const displayMonth = date.getMonth();
const displayDate = date.getDate();
const displayDay = date.getDay();

function printCalendar(today) {
  // 전역변수의 값을 변경하지 않도록 지역변수를 선언
  let year = today.getFullYear();
  let month = today.getMonth();
  let dateDay = today.getDate();
  let day = today.getDay();
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // 현재 요일과 날짜표시
  shortCalendar[0].textContent = `${dateDay}`;
  shortCalendar[1].textContent = `${DAYS[day]}`;

  // 현재 월과 년도 제목 표시
  calendarTitle.textContent = `${MONTHS[month]} ${year}`;

  // 현재 달의 1일의 요일을 인덱스 값으로 가짐.
  let idx = firstDay;

  for (let i = 0; i < monthDate.length; i++) {
    monthDate[i].textContent = ' ';
  }

  for (let i = 1; i <= lastDate; i++) {
    monthDate[idx].textContent = i;

    if (displayYear === year && displayMonth === month && displayDate === i) {
      monthDate[idx].style.backgroundColor = 'rgb(33, 150, 243, 1)';
    } else {
      monthDate[idx].style.color = 'black';
    }

    updateSelectedDay(idx, firstDay);

    idx++;
  }
}

function updateSelectedDay(currentIndex, firstDay) {
  monthDate[currentIndex].addEventListener('click', function (event) {
    if (!event.target.textContent) {
      return;
    }

    if (currentIndex < 7) {
      shortCalendar[1].textContent = DAYS[currentIndex];
    } else {
      shortCalendar[1].textContent = DAYS[currentIndex % 7];
    }

    let newIndex = currentIndex - firstDay;
    shortCalendar[0].textContent = newIndex + 1;
  });
}

//for(const dateBtn of monthDate){
//  dateBtn.addEventListener("click",function(event){
//    const date = dateBtn.textContent;
//    shortCalendar[1].innerText = `${date}`;
//  })
//}

const prevBtn = document.querySelector('.prev-btn');
prevBtn.addEventListener('click', function () {
  let month = date.getMonth();
  date.setMonth(month - 1);
  printCalendar(date);
});

const nextBtn = document.querySelector('.next-btn');
nextBtn.addEventListener('click', function () {
  let month = date.getMonth();
  date.setMonth(month + 1);
  printCalendar(date);
});

function init() {
  printCalendar(date);
}

init();
