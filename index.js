const mongose = require('mongoose');
const { string, number } = require('joi');

// Connect to DataBase MongoDB Local
mongose.connect('mongodb://localhost/employees', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=> console.log('Connected'))
    .catch((e)=> console.error('Failed' + e ));

// Schema  = Structure Employee => Fields and Types 

const employeeSchema = new mongose.Schema({
    FullName: String,
    Age: Number,
    Departement: [ String ],
    Date: { type: Date, default: Date.now },
    IsApproved: Boolean
});
// Using Schema for Contructure new Employee
const Employee =mongose.model('Employee', employeeSchema);

// Create New Employee 
const NewEmployee = new Employee({
    FullName: 'Zouhair ETTARAK',
    Age:30,
    Departement: ['IT', 'HR'],
    IsApproved: true
});