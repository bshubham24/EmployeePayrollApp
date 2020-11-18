
const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function(){
  output.textContent = salary.value;
});

class EmployeePayrollData{

   constructor(...params){
        this.name = params[0];
        this.profilePic = params[1];
        this.gender = params[2];
        this.department = params[3];
        this.salary = params[4];
        this.startDate = params[5];
        this.note = params[6];
    }

    get id(){return this._id;}
    set id(id){
        if(id > 0) this._id = id;
        else throw "Invalid id";
    }

    get name(){return this._name;}
    set name(name){
     this._name = name;
    }

    get profilePic(){return this._profilePic;}
    set profilePic(profilePic){this._profilePic = profilePic;}

    get salary(){return this._salary;}
    set salary(salary){ this._salary = salary;}

    get gender(){return this._gender;}
    set gender(gender){this._gender = gender;}

    get department(){return this._department;}
    set department(department){this._department = department;}

    get startDate(){return this._startDate;}
    set startDate(startDate){
       this._startDate = startDate;
    }

    get note(){return this._note;}
    set note(note){this._note = note;}

    toString(){
        const options ={ year : "numeric", month : "long", day : "numeric"};
        const empDate = this.startDate === undefined ? "undefined" :
                       this.startDate.toLocaleDateString("en-US", options);
       return "id=" + this.id + " name = "+ this.name + " gender = "+ this.gender
        + " profilePic="+ this.profilePic+ " department = "+ this.department + " salary = "+ this.salary+
        " startDate="+empDate+" node="+ this.note;
    }
} 


function save(){
    var name= document.getElementById("name").value;
    var picture = document.querySelector('[name = profile]').value;
    var gender = document.querySelector('[name = gender]').value;
    var department =document.querySelector('[name = department]').value;
    var salary = document.getElementById("salary").value;
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    var note = document.getElementById("notes").value;
    var startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  
   const employee = new EmployeePayrollData(name, picture, gender, department, salary, startDate, note);
  
   alert("Thank you! " + employee.toString());
  } 