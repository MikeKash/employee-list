// Targer DOM section where info will be displayed
const eployeeSection = document.getElementById('employees');
const paginationSection = document.getElementById('pagination');
const url = 'https://emplistapi-258220.appspot.com/';

// data for pagination. ROWS can be changed to set how many rows needs to be dsiaplyed on the page.
// qty of nuttons will updated automatically

let rows = 3;
let current_page = 1;

// to get data from API and call functions to display info on the page as well as create buttons on the fly
async function showEmployees() {
  const response = await fetch(url);
  const employees = await response.json();
  displayEmployees(employees, rows, current_page);
  pagination(employees, paginationSection, rows);
};
showEmployees();


// PAGINATION FUNCTION
const pagination = (list, wrapper, rows_per_page) => {
  wrapper.innerHTML = '';
  let pageCount = Math.ceil(list.length / rows_per_page);

  // CREATE BUTTONS
  for (let i = 1; i < pageCount + 1; i++) {
    let button = document.createElement('button');
    button.innerText = i;
    button.classList.add('button', 'is-primary');
    button.id = i;
    paginationSection.appendChild(button);

    let paginationBtn = document.querySelectorAll('#pagination .button');

    paginationBtn.forEach((btn) => {
      // console.log(btn.id);
      btn.addEventListener('click', () => {
        current_page = btn.id;
        // console.log(btn.id);
        displayEmployees(list, rows_per_page, current_page);
      })
    })
  }
}

// function to display info on the page
const  displayEmployees = (list, rows_per_page, page) => {
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;

  let displayEmployeeList = list.map(function (employee) {
    employeePhoto = employee.photoURL;
    if (employeePhoto === null) {
      employeePhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    }
    employeeName = employee.name.first + " " + employee.name.last;
    employeeJobTitle = employee.jobTitle;
    if (employeeJobTitle === null) {
      employeeJobTitle = '';
    }
    return `<article class="media box">
    <figure class="media-left">
      <p class="image is-64x64 is-1by1">
        <img class="is-rounded" src=${employeePhoto} alt=${employeeName}>
      </p>
    </figure>        
    <div class="media-content">
      <div class="content">
        <p>
          <strong>${employeeName}</strong> 
          <br>
          ${employeeJobTitle}
        </p>
      </div>   
    </div> 
  </article>`;
  });

  // DISPLAY EMPLOYEE LIST
  displayEmployeeList = displayEmployeeList.slice(start, end);

  displayEmployeeList = displayEmployeeList.join("");
  eployeeSection.innerHTML = displayEmployeeList;
}



// SELECT ITEMS
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const jobTitle = document.getElementById('job-title');
const profilePhoto = document.getElementById('profile-photo');
const title = document.getElementById('title');

const newEmployeeBtn = document.getElementById('new-employee-btn');
const newEmployee = document.getElementById('new-employee');
const submitEmployeeBtn = document.getElementById('submit-employee-btn');
const newEmployeeForm = document.querySelector('.new-employee-form')
const alert = document.getElementById('alert');
const employees = document.getElementById('employees');
const toggleBtn = document.getElementById('toggle-btn');
const navBarMenu = document.querySelector('.navbar-menu');
const closeBtn = document.getElementById('close-form-btn');

// Event listener to show ADD NEW EMPLOYEE FORM
newEmployeeBtn.addEventListener('click', () => {
  newEmployee.classList.remove("hide-form");
  employees.classList.add('hide-form');
  newEmployeeBtn.classList.add('hide-form');
  paginationSection.classList.add('hide-form');
  title.classList.add('hide-form');
})

closeBtn.addEventListener('click', () => {
  newEmployee.classList.add("hide-form");
  employees.classList.remove('hide-form');
  newEmployeeBtn.classList.remove('hide-form');
  paginationSection.classList.remove('hide-form');
  title.classList.remove('hide-form');
})

// Event Listener for NEW EMPLOYEE FORM BUTTON
newEmployeeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  alert.classList.remove('hide-form');
  setTimeout(() => {
    alert.classList.add('hide-form');
    newEmployee.classList.add("hide-form");
    employees.classList.remove('hide-form');
    newEmployeeBtn.classList.remove('hide-form');
    paginationSection.classList.remove('hide-form');
    title.classList.remove('hide-form');
    // to reset vlues in the form after submitting
    firstName.value = '';
    lastName.value = '';
  }, 2000);
  newEmployeeData();
})

// MOBILE MENU TOGGLE
toggleBtn.addEventListener('click', () => {
  navBarMenu.classList.toggle('show-menu');
})

// GET NEW EMPLOYEE INFO FUNCTIONS
const newEmployeeData = () => {
  let employee = [{
    "name": {
      "first": firstName.value,
      "last": lastName.value,
    },
    "jobTitle": jobTitle.value,
    "photoURL": profilePhoto.value,
  }, ]
  console.log(employee);
  return employee;
}
