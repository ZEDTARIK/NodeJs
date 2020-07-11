const express =require('express');
const { json } = require('express');
const app = express();

app.use(json());

employees = [
    {empId: 1 , employeeName: "Zouhair ETTARAK", salary: 9000},
    {empId: 2, employeeName: "Hafssa ELMESKANI", salary: 2000 },
    {empId: 3, employeeName: "Rachida ELHIDAOUI", salary: 6000 },
]


app.get('/', (req, res) => {
    res.send(employees);
});

app.get('/employees/:id', (req, res) => {
    const findEmployee = employees.find(element => element.empId == req.params.id)
    if (!findEmployee)
    {
        res.send("Employee Not Found");
    }
    res.send(findEmployee);
});


// Route : http://localhost:3000/employees
app.post('/employees', (req, res)=> {
    
    const employee = {
        empId: req.body.empId,
        employeeName: req.body.employeeName,
        salary: req.body.salary        
    }
    employees.push(employee);
    res.send(employee)
});

const port =process.env.port || 3000
app.listen(port, ()=> console.log('localhost:3000'));
