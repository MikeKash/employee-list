// Targer DOM section where info will be displayed
const eployeeSection = document.getElementById('employees');
const paginationSection = document.getElementById('pagination');
const url = 'https://emplistapi-258220.appspot.com/';

// data for pagination. ROWS can be changed to set how many rows needs to be dsiaplyed on the page.
// qty of nuttons will updated automatically

let rows = 3;
let current_page = 1;

let employeeList = [{
    "name": {
      "first": "Clara",
      "last": "Wade"
    },
    "jobTitle": "General Manager",
    "photoURL": "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  }, {
    "name": {
      "first": "Stafford",
      "last": "Fleming"
    },
    "photoURL": null,
    "jobTitle": null
  }, {
    "name": {
      "first": "Sawyer",
      "last": "Freeman"
    },
    "jobTitle": "Stylist",
    "photoURL": "https://images.pexels.com/photos/374044/pexels-photo-374044.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }, {
    "name": {
      "first": "Susanna",
      "last": "Orr"
    },
    "jobTitle": "Stylist",
    "photoURL": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  }, {
    "name": {
      "first": "Stephanie",
      "last": "Mills"
    },
    "jobTitle": "Receptionist",
    "photoURL": "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }, {
    "name": {
      "first": "Silvia",
      "last": "Foley"
    },
    "jobTitle": "Esthetician",
    "photoURL": "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }, {
    "name": {
      "first": "Hester",
      "last": "Hobbs"
    },
    "photoURL": null,
    "jobTitle": "Stylist"
  },
  {
    "name": {
      "first": "Sosa",
      "last": "Carpenter"
    },
    "photoURL": null,
    "jobTitle": "Stylist"
  }, {
    "name": {
      "first": "Cooley",
      "last": "Duncan"
    },
    "photoURL": null,
    "jobTitle": "Stylist"
  }, {
    "name": {
      "first": "Spence",
      "last": "Woodward"
    },
    "jobTitle": "Trainee",
    "photoURL": "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }, {
    "name": {
      "first": "Deana",
      "last": "Oneil"
    },
    "photoURL": null,
    "jobTitle": "Stylist"
  }, {
    "name": {
      "first": "Hall",
      "last": "Boone"
    },
    "photoURL": null,
    "jobTitle": "Stylist"
  }, {
    "name": {
      "first": "Ruby",
      "last": "Klein"
    },
    "photoURL": null,
    "jobTitle": "Stylist"
  }, {
    "name": {
      "first": "Shane",
      "last": "Flores"
    },
    "jobTitle": "Senior Stylist",
    "photoURL": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }, {
    "name": {
      "first": "Karen",
      "last": "Hoover"
    },
    "jobTitle": "Stylist",
    "photoURL": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }
]

// to get data from API and call functions to display info on the page as well as create buttons on the fly
function showEmployees() {
  // const response = await fetch(url);
  // const employees = await response.json();
  displayEmployees(employeeList, rows, current_page);
  pagination(employeeList, paginationSection, rows);
};


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
      btn.addEventListener('click', () => {
        current_page = btn.id;
        displayEmployees(list, rows_per_page, current_page);
      })
    })
  }
}

// function to display info on the page
const displayEmployees = (list, rows_per_page, page) => {
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;

  let displayEmployeeList = list.map(function (employee) {
    employeePhoto = employee.photoURL;
    if (!employeePhoto) {
      employeePhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    }
    employeeName = employee.name.first + " " + employee.name.last;
    employeeJobTitle = employee.jobTitle;
    if (!employeeJobTitle) {
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


// const profilePhoto = document.getElementById('profile-photo');
const profilePhoto = "";


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
    // to reset va after submitting
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

  profilePhoto.replace( /C:\\fakepath\\/i, "" );



  let employee = {
    "name": {
      "first": firstName.value,
      "last": lastName.value,
    },
    "jobTitle": jobTitle.value,
    "photoURL": profilePhoto
  };
  console.log(employee);
  employeeList.unshift(employee);
  showEmployees();
}

showEmployees();
