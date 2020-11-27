class EmployeePayrollData {
  id;

  constructor(...params) {
    this.name = params[0];
    this.profilePic = params[1];
    this.gender = params[2];
    this.department = params[3];
    this.salary = params[4];
    this.startDate = params[5];
    this.note = params[6];
  }

  get name() { return this._name; }
  set name(name) {
    this._name = name;

  }

  get profilePic() { return this._profilePic; }
  set profilePic(profilePic) { this._profilePic = profilePic; }

  get salary() { return this._salary; }
  set salary(salary) { this._salary = salary; }

  get gender() { return this._gender; }
  set gender(gender) { this._gender = gender; }

  get department() { return this._department; }
  set department(department) { this._department = department; }

  get startDate() { return this._startDate; }
  set startDate(startDate) {
    this._startDate = startDate;

  }

  get note() { return this._note; }
  set note(note) { this._note = note; }

  toString() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const empDate = this.startDate === undefined ? "undefined" :
      this.startDate.toLocaleDateString("en-GB", options);
    return "id=" + this.id + " name = " + this.name + " gender = " + this.gender
      + " profilePic=" + this.profilePic + " department = " + this.department + " salary = " + this.salary +
      " startDate=" + empDate + " node=" + this.note;
  }
}

let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
  checkForUpdate();

  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function () {
    output.textContent = salary.value;
  });

  const name = document.querySelector("#name");
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      setTextValue(".text-error", "");
      return;
    }
    try {
      checkName(name.value);
      setTextValue(".text-error", "");
    } catch (e) {
      setTextValue(".text-error", e);
    }
  });

  const startDate = document.querySelector("#startDate");
  const day = document.querySelector("#day");
  const month = document.querySelector("#month");
  const year = document.querySelector("#year");
  startDate.addEventListener("input", function () {
    let startDate = new Date(Date.UTC(year.value, month.value - 1, day.value));
    try {
      checkStartDate(new Date(Date.parse(startDate)));
      setTextValue(".date-error", "");
    } catch (e) {
      setTextValue(".date-error", e);
    }
  });
  document.querySelector(".cancelButton").href = site_properties.home_page;
});

const createOrUpdateEmp = () => {
  let postURL = site_properties.server_url;
  let methodCall = "POST";
  if(isUpdate){
    methodCall = "PUT";
    postURL = postURL + employeePayrollObj.id.toString();
  }
  makeServiceCall(methodCall, postURL, true, employeePayrollObj)
                .then(responseText => {
                  resetForm();
                  window.location.replace(site_properties.home_page);
                })
                .catch(error => {
                  throw error;
                });
};

function createAndUpdateStorage() {
  let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeeList) {
    let employee = employeeList.find(emp => emp.id == employeePayrollObj.id);
    if (!employee) employeeList.push(employeePayrollObj);
    else {
      const index = employeeList.map(emp => emp.id)
        .indexOf(employee.id);
      employeeList.splice(index, 1, employeePayrollObj);
    }
  } else {
    employeeList = [employeePayrollObj];
  }
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeeList));
}


const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try {
    setEmployeePayrollObject();
    if(site_properties.use_local_storage.match("true")){
      createAndUpdateStorage();
      resetForm();
      window.location.replace(site_properties.home_page);
      }else{
        createOrUpdateEmp();
      }
    window.location.replace(site_properties.home_page);
  } catch (e) {
    return;
  }
};

const setEmployeePayrollObject = () => {
  if (!isUpdate && site_properties.use_local_storage.match("true")) {
    employeePayrollObj.id = createNewId();
  }
  employeePayrollObj._name = document.getElementById("name").value;
  employeePayrollObj._profilePic = document.querySelector('input[name = profile]:checked').value;
  employeePayrollObj._gender = document.querySelector('input[name = gender]:checked').value;
  employeePayrollObj._department = getSelectedValues('[name=department]');
  employeePayrollObj._salary = document.getElementById("salary").value;
  var day = document.getElementById("day").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("year").value;
  employeePayrollObj._note = document.getElementById("notes").value;
  employeePayrollObj._startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};


const createNewId = () => {
  let empId = localStorage.getItem("EmployeeID");
  empId = !empId ? 1 : (parseInt(empId) + 1).toString();
  localStorage.setItem("EmployeeID", empId);
  return empId;
};

const getSelectedValues = (property) => {
  let allItems = document.querySelectorAll(property);
  let setItems = [];
  allItems.forEach(item => {
    if (item.checked) setItems.push(item.value);
  });
  return setItems;
};

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
};

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked = false;
  });
};

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
};

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) item.checked = true;
    }
    else if (item.value == value) item.checked = true;
  });
};

const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
};

const setForm = () => {
  setValue("#name", employeePayrollObj._name);
  setSelectedValues("[name=profile]", employeePayrollObj._profilePic);
  setSelectedValues("[name=gender]", employeePayrollObj._gender);
  setSelectedValues("[name=department]", employeePayrollObj._department);
  setValue("#salary", employeePayrollObj._salary);
  setTextValue(".salary-output", employeePayrollObj._salary);
  setValue("#notes", employeePayrollObj._note);
  let date = stringifyDate(employeePayrollObj._startDate).split(" ");
  let month = new Date(date).getMonth() + 1;
  setValue("#day", date[0]);
  setValue("#month", month);
  setValue("#year", date[2]);
};

const resetForm = () => {
  setValue("#name", "");
  unsetSelectedValues("[name=profile]");
  unsetSelectedValues("[name=gender]");
  unsetSelectedValues("[name=department]");
  setValue("#salary", "");
  setValue("#notes", "");
  setSelectedIndex("#day", 0);
  setSelectedIndex("#month", 0);
  setSelectedIndex("#year", 0);
};


const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem("editEmp");
  isUpdate = employeePayrollJson ? true : false;
  if (!isUpdate) return;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
};