// Fetch data from JSON file
fetch("https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json").then((response)=>{
   return response.json();
}).then((data)=> {
    const tableBody = document.querySelector('#students-table tbody');

    // Map all the elements in the table
    data.forEach(student => {
      // Show either passing or failed instead of boolean
      const passingStatus = student.passing ? 'Passed' : 'Failed';

      // Create table row
      const row = document.createElement('tr');

      // Create table cell for name
      const id = document.createElement('td');
      id.textContent = student.id;
      const nameCell = document.createElement('td');
      const img = document.createElement('img');
      img.src = student.img_src;
    //  img.alt = `${student.first_name} ${student.last_name}`;
      img.width = '30';
      img.height = '30';
      const name = document.createElement('span');
      name.textContent = `${student.first_name} ${student.last_name}`;
      nameCell.appendChild(img);
      nameCell.appendChild(name);

     
      const genderCell = document.createElement('td');
      genderCell.textContent = student.gender;

      const classCell = document.createElement('td');
      classCell.textContent = student.class;

      const marksCell = document.createElement('td');
      marksCell.textContent = student.marks;

     
     
      const passingCell = document.createElement('td');
      passingCell.textContent =passingStatus;

    
      const emailCell = document.createElement('td');
      emailCell.textContent = student.email;

      // Append all table cells to table row
      row.appendChild(id)
      row.appendChild(nameCell);
      row.appendChild(genderCell);
      row.appendChild(classCell);
      row.appendChild(marksCell);
      row.appendChild(passingCell);
     
      row.appendChild(emailCell);

      // Append table row to table body
      tableBody.appendChild(row);
    });

    // Add search functionality
    const searchInput = document.querySelector('#search-input');
    const searchButton = document.querySelector('#search-button');

    function handleSearch() {
      const searchTerm = searchInput.value.toLowerCase();
      const rows = tableBody.querySelectorAll('tr');

      rows.forEach(row => {
        const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const email = row.querySelector('td:nth-child(7)').textContent.toLowerCase();

        if ((name.includes(searchTerm)) || email.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('change', handleSearch);

   
    // Add sorting functionality
const sortNameAscButton = document.querySelector('#sort-name-asc');
const sortNameDescButton = document.querySelector('#sort-name-desc');

const sortMarksButton = document.querySelector('#sort-marks');
const sortPassingButton = document.querySelector('#sort-passing');
const sortClassButton = document.querySelector('#sort-class');
const sortGenderButton = document.querySelector('#sort-gender');


function sortByNameAsc() {
 

  const rows = tableBody.querySelectorAll('tr');
  const sortedRows = Array.from(rows).sort((a, b) => {
    const nameA = a.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const nameB = b.querySelector('td:nth-child(2)').textContent.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  sortedRows.forEach(row => tableBody.appendChild(row));
 
}

function sortByNameDesc() {
  const rows = tableBody.querySelectorAll('tr');
  const sortedRows = Array.from(rows).sort((a, b) => {
    const nameA = a.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const nameB = b.querySelector('td:nth-child(2)').textContent.toLowerCase();
    if (nameA > nameB) return -1;
    if (nameA < nameB) return 1;
    return 0;
  });
  sortedRows.forEach(row => tableBody.appendChild(row));
}

function sortByMarks() {
  const rows = tableBody.querySelectorAll('tr');
  const sortedRows = Array.from(rows).sort((a, b) => {
    const marksA = parseInt(a.querySelector('td:nth-child(5)').textContent);
    const marksB = parseInt(b.querySelector('td:nth-child(5)').textContent);
    return marksA - marksB;
  });
  sortedRows.forEach(row => tableBody.appendChild(row));
}

function sortByPassing() {
  const rows = tableBody.querySelectorAll('tr');
  rows.forEach(row => {
    const passing = row.querySelector('td:nth-child(6)').textContent;
    if (passing !== 'Passed') {
      row.style.display = 'none';
    } else {
      row.style.display = '';
    }
  });
}

function sortByClass() {
  const rows = tableBody.querySelectorAll('tr');
  const sortedRows = Array.from(rows).sort((a, b) => {
    const classA = a.querySelector('td:nth-child(4)').textContent;
    const classB = b.querySelector('td:nth-child(4)').textContent;
    return classA - classB;
  });
  sortedRows.forEach(row => tableBody.appendChild(row));
}

function sortByGender() {
  const rows = tableBody.querySelectorAll('tr');
  const maleRows = [];
  const femaleRows = [];
  rows.forEach(row => {
    const gender = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    if (gender === 'male') {
      maleRows.push(row);
    } else if (gender === 'female') {
      femaleRows.push(row);
    }
  });


 tableBody.innerHTML = '';
 
  femaleRows.forEach(row => tableBody.appendChild(row));
  maleRows.forEach(row => tableBody.appendChild(row));
}


sortNameAscButton.addEventListener('click', sortByNameAsc);
sortNameDescButton.addEventListener('click', sortByNameDesc);

sortClassButton.addEventListener('click', sortByClass);
sortMarksButton.addEventListener('click', sortByMarks);
sortPassingButton.addEventListener('click', sortByPassing);

sortGenderButton.addEventListener('click', sortByGender);

})