let employeePayrollList;

window.addEventListener("DOMContentLoaded", (event)=> {
    employeePayrollList = getEmployeePayrollDataFromStrorage();
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStrorage = () => {
    return localStorage.getItem('EmployeePayrollList')?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
    const headerHtml = "<th></th> <th>Name</th>  <th>Gender</th> <th>Department</th> <th>Salary</th> <th>Start Date</th> <th>Actions</th>";
    if(employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const employee of employeePayrollList){
    innerHtml = `${innerHtml}
<tr>
    <td><img class="profile" alt="" src="${employee._profilePic}" alt=""></td>
    <td>${employee._name}</td>
    <td>${employee._gender}</td>
    <td><div class="dept-label">${getDeptHtml(employee._department)}</div>
    <td>${employee._salary}</td>
    <td>${stringifyDate(employee._startDate)}</td>
    <td>
        <img id = "${employee.id}" onclick="remove(this)" alt="delete"
             src="../assets/assets/icons/delete-black-18dp.svg">
        <img id ="${employee.id}" alt="edit" onclick="update(this)"
             src="../assets/assets/icons/create-black-18dp.svg">
    </td>
</tr>
    `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml}<div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) => {
    let employee = employeePayrollList.find(emp => emp.id == node.id);
    if(!employee) return;
    const index = employeePayrollList.map(emp => emp.id)
                                     .indexOf(employee.id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
};

const update = (node) => {
    let employee = employeePayrollList.find((emp) => emp.id == node.id);
    if (!employee) return;
    localStorage.setItem("editEmp", JSON.stringify(employee));
    window.location.replace(site_properties.add_emp_payroll_page);
  }; 
  
const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [
        {
            _name: 'Shubham Bhawsar',
            _gender: 'male',
            _department: ['Engineering', 'Finance'],
            _salary: '50000',
            _startDate: '29 Oct 2019',
            _note: '',
            id: new Date().getTime(),
            _profilePic: '../assets/assets/profile-images/Ellipse -3.png'
        },
        {
            _name: 'Sakshi Chouhan',
            _gender: 'female',
            _department: ['Literature'],
            _salary: '50000',
            _startDate: '29 Oct 2019',
            _note: '',
            id: new Date().getTime() + 1,
            _profilePic: '../assets/assets/profile-images/Ellipse -1.png'
        }
    ];
    return employeePayrollListLocal;
}
