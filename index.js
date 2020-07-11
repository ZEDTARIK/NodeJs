const express = require('express');
const Joi = require('joi');
const { json } = require('express');
const loggerMidlware =require('./logger/logginMiddelware');
const app = express();
app.use(json());
//app.use(loggerMidlware);

employeesArray = [
    { empId: 1, employeeName: "Zouhair ETTARAK", salary: 9000 },
    { empId: 2, employeeName: "Hafssa ELMESKANI", salary: 2000 },
    { empId: 3, employeeName: "Rachida ELHIDAOUI", salary: 6000 },
]

app.get('/', (req, res) => {
    res.send(employeesArray);
});

app.get('/employees/:id', (req, res) => {
    const findEmployee = employeesArray.find(element => element.empId == req.params.id)
    if (!findEmployee) {
        res.send("Employee Not Found");
    }
    res.send(findEmployee);
});

function employeeValidate(employee) {
    const schema = {
        empId: Joi.number().integer().required(),
        employeeName: Joi.string().required(),
        salary: Joi.number().integer().required()
    };

    return Joi.validate(employee, schema);
}

// POST  Route : http://localhost:3000/employees

app.post('/employees', (req, res) => {
    const { error } = employeeValidate(req.body);
    if (error) {
        return res.send(error.details[0].message)
    }
    const employee = {
        empId: req.body.empId,
        employeeName: req.body.employeeName,
        salary: req.body.salary
    }
    employeesArray.push(employee);
    res.send(employee)
});

function employeePutValidate(employee) {
    const schema = {
        employeeName: Joi.string().required(),
    };

    return Joi.validate(employee, schema);
}
// PUT Route : http://localhost:3000/employees/id
app.put('/employees/:id', (req, res) => {
    const findEmployee = employeesArray.find(element => element.empId == req.params.id)
    if (!findEmployee) {
       return  res.send("Employee Not Found");
    }
    const { error } = employeePutValidate(req.body);
    if (error) {
        return res.send(error.details[0].message)
    }
    findEmployee.employeeName = req.body.employeeName;
    res.send(findEmployee);
});

app.delete('/employees/:id', (req, res)=>{
    const findEmployee = employeesArray.find(element => element.empId == req.params.id)
    if (!findEmployee) {
        return res.send("Employee Not Found");
    }
    const employeeIndex = employeesArray.indexOf(findEmployee);
    employeesArray.splice(employeeIndex, 1);
    res.send('This Employee : = '+ findEmployee.employeeName + ' Deleted With SuccesFully');
});

const port = process.env.port || 3000
app.listen(port, () => console.log('localhost:3000'));
