import config from 'employee-manager/config/environment';


export function initialize(appInstance) {
  if (config.environment !== 'test') {
    const employeeService = appInstance.lookup('service:employee-service')

    const employeeData = employeeService.generateEmployeeData(12)

    employeeService.getAllEmployees().then((employees) => {
      employees.length === 0 &&
      employeeData.forEach((employee) => employeeService.addEmployee(employee))
    })
  }
}

export default {
  initialize
};
