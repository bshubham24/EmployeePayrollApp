let empPayrollList;
window.addEventListener("DOMContentLoaded", (event)=> {
    empPayrollList = getEmployeePayrollDataFromStrorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStrorage = () => {
    return localStorage.getItem('EmployeePayrollList')?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
    const headerHtml = "<th></th> <th>Name</th>  <th>Gender</th> <th>Department</th> <th>Salary</th> <th>Start Date</th> <th>Actions</th>";
    if(empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const empPayrollData of empPayrollList){
    innerHtml = `${innerHtml}
<tr>
    <td><img class="profile" alt="" src="${empPayrollData._profilePic}" alt=""></td>
    <td>${empPayrollData._name}</td>
    <td>${empPayrollData._gender}</td>
    <td><div class="dept-label">${getDeptHtml(empPayrollData._department)}</div>
    <td>${empPayrollData._salary}</td>
    <td>${stringifyDate(empPayrollData._startDate)}</td>
    <td>
        <img id = "${empPayrollData._name}" onclick="remove(this)" alt="delete"
             src="../assets/assets/icons/delete-black-18dp.svg">
        <img id ="${empPayrollData._id}" alt="edit" onclick="update(this)"
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
    let employee = empPayrollList.find(emp => emp._name == node.id);
    if(!employee) return;
    const index = empPayrollList.map(emp => emp._name)
                                     .indexOf(employee._name);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
};

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
