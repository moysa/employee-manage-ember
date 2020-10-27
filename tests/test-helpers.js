export const seedEmployees = (employeeService, persistanceService) =>
  (entries, salaries = []) => {
    persistanceService.clear()

    for(let i = 1; i < entries + 1; i++) {
      const data = {
        firstName: `Test_${i}`,
        lastName: `Tester_${i}`,
        email: `test_${i}@test.com`,
        address: `Street No ${i}`,
        salary: salaries[i-1] || 1000
      }

      employeeService.addEmployee(data)
    }
  }
