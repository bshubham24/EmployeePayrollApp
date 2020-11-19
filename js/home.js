window.addEventListener("DOMContentLoaded", (event)=> {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th> <th>Name</th>  <th>Gender</th> <th>Department</th> <th>Salary</th> <th>Start Date</th> <th>Actions</th>";
    let innerHtml = `${headerHtml}`
    let employeePayrollList = createEmployeePayrollJSON();
    for(const empPayrollData of employeePayrollList){
    innerHtml = `${innerHtml}
<tr>
    <td><img class="profile" alt="" src="${empPayrollData._profilePic}" alt=""></td>
    <td>${empPayrollData._name}</td>
    <td>${empPayrollData._gender}</td>
    <td><div class="dept-label">${getDeptHtml(empPayrollData._department)}</div>
    <td>${empPayrollData._salary}</td>
    <td>${empPayrollData._startDate}</td>
    <td>
        <img name = "${empPayrollData._id} onclick="remove(this)" alt="delete"
             src="../assets/assets/icons/delete-black-18dp.svg">
        <img name="${empPayrollData._id} alt="edit" onclick="update(this)"
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

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Shubham Bhawsar',
            _gender: 'male',
            _department: ['Engineering', 'Finance'],
            _salary: '50000',
            _startDate: '29 Oct 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/assets/profile-images/Ellipse -3.png'
        },
        {
            _name: 'Sakshi Chouhan',
            _gender: 'female',
            _department: ['Literature'],
            _salary: '50000',
            _startDate: '29 Oct 2019',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/assets/profile-images/Ellipse -1.png'
        }
    ];
    return empPayrollListLocal;
}
