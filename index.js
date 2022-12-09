// Your code here
function createEmployeeRecord(array) {
    return {
        firstName : array[0],
        familyName : array[1],
        title  : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : []
     }
}

function createEmployeeRecords(employeeDt){
    let arrayOfEmployee = []
    for(let array of employeeDt){
        let employeeRecordObject = createEmployeeRecord(array)
        arrayOfEmployee.push(employeeRecordObject)
    }
     return arrayOfEmployee
}
function createTimeInEvent(employee, dateStamps) {
    let timeInObject = {
        type: "TimeIn",
        hour: parseInt(dateStamps.slice(-4)),
        date: dateStamps.slice(0, 10)  
     }

     employee.timeInEvents.push(timeInObject)    
     return employee
}
//2021-09-15 19
function createTimeOutEvent(employee, dateStamps) {
    let timeOutObject = {
        type: "TimeOut",
        hour: parseInt(dateStamps.slice(-4)),
        date: dateStamps.slice(0, 10)  
     }

     employee.timeOutEvents.push(timeOutObject)    
     return employee
}
function hoursWorkedOnDate(employee, dateStamp) {
    let timeIn = employee.timeInEvents.find(time=>{
        if (time.date === dateStamp){
            return true
        }
    }).hour
    let timeOut = employee.timeOutEvents.find(time=>{
        if (time.date === dateStamp){
            return true
        }
    
    }).hour
    let  difference = timeOut - timeIn
    return difference/100
}
function wagesEarnedOnDate(employee, dateStamp){
    let hours = hoursWorkedOnDate(employee, dateStamp)
    return hours*employee.payPerHour
}
function allWagesFor(employeeRecordObject){
    return employeeRecordObject.timeInEvents.reduce((accumulator, currentValue)=>{
        return accumulator + wagesEarnedOnDate(employeeRecordObject, currentValue.date)
    }, 0 )
}
function calculatePayroll(arrayOfEmployeeRecords){
    return  arrayOfEmployeeRecords.reduce((accumulator, currentValue)=>{
        return accumulator + allWagesFor(currentValue)
    }, 0 )
}