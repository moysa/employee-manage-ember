import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | employee_service', function(hooks) {
  setupTest(hooks);

  test('fetching from an empty store', async function(assert) {
    const service = this.owner.lookup('service:employee-service');

    const all = await service.getAllEmployees();
    const count = service.getEmployeeCount();
    const total = await service.getSalarySum();
    const average = await service.getAverageSalary();
    const { employees, ...rest } =
      await service.getEmployeesPaginated({ page: 1 });

    assert.equal(all.length, 0, 'getAllEmployees returns an empty record');

    assert.equal(employees.length, 0,
      'getEmployeesPaginated returns an empty record');

    assert.propEqual(rest,
      { page: 1, perPage: 5, total: 0},
      'getEmployeesPaginated returns correct format');

    assert.equal(count, 0, 'getEmployeeCount returns zero');

    assert.equal(average, 0, 'getAverageSalary returns zero');

    assert.equal(total, 0, 'getSalarySum returns zero');

  });

  test('adding one employee to store', async function(assert) {
    const service = this.owner.lookup('service:employee-service');

    const data = {
      firstName: 'Test',
      lastName: 'Tester',
      email: 'test@test.com',
      address: 'Test Street 1',
      salary: 1234
    }

    await service.addEmployee(data)

    const all = await service.getAllEmployees();
    const count = service.getEmployeeCount();
    const total = await service.getSalarySum();
    const average = await service.getAverageSalary();
    const { employees, ...rest } =
      await service.getEmployeesPaginated({ page: 1 });

    assert.equal(all.length, 1, 'getAllEmployees returns a one-item record');

    assert.equal(employees.length, 1,
      'getEmployeesPaginated returns a one-item record');

    assert.propEqual(rest,
      { page: 1, perPage: 5, total: 1},
      'getEmployeesPaginated returns correct format');

    assert.equal(count, 1, 'getEmployeeCount returns one');

    assert.equal(average, 1234, 'getAverageSalary is correct');

    assert.equal(total, 1234, 'getSalarySum is correct');
  });

  test('adding two employees to store', async function(assert) {
    const service = this.owner.lookup('service:employee-service');

    const data = [{
        firstName: 'Test_1',
        lastName: 'Tester_1',
        email: 'test_1@test.com',
        address: 'Test Street 1',
        salary: 1200
      },{
        firstName: 'Test_2',
        lastName: 'Tester_@',
        email: 'test_2@test.com',
        address: 'Test Street 2',
        salary: 1800
      }]

    await service.addEmployee(data[0])
    await service.addEmployee(data[1])

    const all = await service.getAllEmployees();
    const count = service.getEmployeeCount();
    const total = await service.getSalarySum();
    const average = await service.getAverageSalary();
    const { employees, ...rest } =
      await service.getEmployeesPaginated({ page: 1 });

    assert.equal(all.length, 2, 'getAllEmployees returns a two-item record');

    assert.equal(employees.length, 2,
      'getEmployeesPaginated returns a two-item record');

    assert.propEqual(rest,
      { page: 1, perPage: 5, total: 2},
      'getEmployeesPaginated returns correct format');

    assert.equal(count, 2, 'getEmployeeCount returns two');

    assert.equal(average, 1500, 'getAverageSalary is correct');

    assert.equal(total, 3000, 'getSalarySum is correct');
  });

  test('validating data', async function(assert) {
    const service = this.owner.lookup('service:employee-service');

    const validData = {
      firstName: 'Test_1',
      lastName: 'Tester_1',
      email: 'test_1@test.com',
      address: 'Test Street 1',
      salary: 1200
    };

    const invalidData = {
      firstName: '2',
      lastName: 'Tester_@',
      email: 'test_2@test.com',
      address: 'Test Street 2',
      salary: 'salary'
    };

    const noErrors = service.validate(validData)
    const errors = service.validate(invalidData)

    assert.equal(noErrors.length, 0, 'no errors for valid data');
    assert.equal(errors.length, 2, 'errors for invalid data');
  });

  test('delete employee from store', async function(assert) {
    const service = this.owner.lookup('service:employee-service');

    const data = {
      firstName: 'Test',
      lastName: 'Tester',
      email: 'test@test.com',
      address: 'Test Street 1',
      salary: 1234
    }

    const employee = await service.addEmployee(data)

    const all = await service.getAllEmployees();

    assert.equal(all.length, 1, 'after adding we have 1 record');

    await service.deleteEmployee(employee)

    assert.equal(all.length, 0, 'after deleting we have 0 records');
  });

  test('updating employee in store', async function(assert) {
    const service = this.owner.lookup('service:employee-service');

    const data = {
      firstName: 'Test',
      lastName: 'Tester',
      email: 'test@test.com',
      address: 'Test Street 1',
      salary: 1234
    }

    const employee = await service.addEmployee(data);

    const update = {
      id: employee.id,
      firstName: 'Test',
      lastName: 'Tester',
      email: 'test@test.com',
      address: 'Test Street 1',
      salary: 4321
    }

    await service.updateEmployee(update);

    const updated = await service.getEmployee(employee.id);

    assert.equal(updated.salary, 4321, 'updates employee data');
  });

  test('generate employee data', async function(assert) {
    const service = this.owner.lookup('service:employee-service');

    const employeeData = service.generateEmployeeData(12);

    // Take random entry
    const data = employeeData[Math.floor(Math.random() * 11)]

    assert.equal(employeeData.length, 12,
      'generates correct number of employee data');

    assert.deepEqual(
      Object.keys(data),
      ['firstName', 'lastName', 'id', 'email', 'address', 'salary'],
      'generated data has valid format'
    );
  });
});
