const mongose = require('mongoose');
const { string, number } = require('joi');
const { collect } = require('underscore');

// Connect to DataBase MongoDB Local
mongose.connect('mongodb://localhost/employees', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected'))
    .catch((e) => console.error('Failed' + e));

// Schema  = Structure Employee => Fields and Types 

const employeeSchema = new mongose.Schema({
    FullName: {type: String, required: true },
    Age: Number,
    Departement: [String],
    Date: { type: Date, default: Date.now },
    IsApproved: Boolean
});

// Using Schema for Contructure new Employee
const Employee = mongose.model('Employee', employeeSchema);


// --------------------------- Create New Employee  ---------------------------------
async function createEmployee() {
    // Create New Employee 
    const NewEmployee = new Employee({
        FullName: 'Hafssa ElMESSKANI',
        Age: 30,
        Departement: ['JavaScript', 'Admin DataBase'],
        IsApproved: true
    });
    const result = await NewEmployee.save();
    console.log(result);
}

 //createEmployee();

// --------------------------- Get List Employee  ---------------------------------

async function getEmployeesList() {
    // get all Employees From Database
    // const query = await Employee.find();
    // Get By Filter
    const query = await Employee
        // .find({ FullName: 'Zouhair ET-TARAK' , Age: 30})
        .find({ Age: { $in: [30, 31] } })
        .sort({ FullName: -1 });
    console.log(query);
}

//getEmployeesList();

// --------------------------- Update Employee Exist  ---------------------------------

async function updateEmployee(id) {
    const employee = await Employee.findById(id);
    if (!employee) {
        return console.log('Employee not Found !');
    }
    employee.Age = 25;
    employee.IsApproved = false;
    const result = await employee.save();
    console.log(result + 'Employee Has Updated SuccessFully');
}

//updateEmployee('5f0d7b938f37391eb0e3d52d');

async function updateEmployee_2(id) {
    const employee = await Employee.findByIdAndUpdate(id,
        {
            $set: {
                Age: 22,
                IsApproved: true
            }
        },
        { new: true }
    );
    console.log(employee + 'Employee Updated ')
}

// updateEmployee_2('5f0d7b938f37391eb0e3d52d');

// --------------------------- Delete Employee Exist  ---------------------------------

async function deleteEmployee(id) {
    const employee = await Employee.findByIdAndRemove(id);
    console.log(employee);
}
// deleteEmployee('5f0d89ca97c3ed24bc31d5d1');
