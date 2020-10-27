import Service from '@ember/service';
import { inject as service } from '@ember/service';
import faker from 'faker';

export default class EmployeeService extends Service {
  @service store
  @service intl

  getAllEmployees() {
    return this.store.findAll('employee');
  }

  async getEmployeesPaginated({ page, perPage = 5 }) {
    const total = await this.getEmployeeCount();
    const employees = this.store.query('employee', { page, perPage });

    return {
      employees,
      page,
      perPage,
      total
    };
  }

  getEmployeeCount() {
    return this.store.peekAll('employee').length;
  }

  async getAverageSalary() {
    const count = await this.getEmployeeCount();
    const total = await this.getSalarySum();

    return count === 0 ? 0 : (total / count).toFixed(2);
  }

  async getSalarySum() {
    const employees = await this.getAllEmployees();

    return employees.content.reduce(
      (acc, employee) => acc + employee.getAttributeValue('salary'),
      0);
  }

  getEmployee(id) {
    return this.store.findRecord('employee', id);
  }

  updateEmployee(employeeData) {
    this.store.findRecord('employee', employeeData.id).then(
      (record) => {
        record.firstName = employeeData.firstName;
        record.lastName = employeeData.lastName;
        record.email = employeeData.email;
        record.address = employeeData.address;
        record.salary = employeeData.salary;

        record.save();
      }
    );
  }

  addEmployee(employeeData) {
    return this.store.createRecord('employee', employeeData).save();
  }

  deleteEmployee(employee) {
    employee.deleteRecord();
    employee.save();
  }

  clear() {
    return this.getAllEmployees().forEach(this.deleteEmployee);
  }

  validate(employeeData) {
    let errors = [];

    const regex = {
      firstName: /.{3,}/g,
      lastName: /.{3,}/g,
      address: /.{3,}/g,
      email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      salary: /^\d+$/g
    };

    ['firstName', 'lastName', 'email', 'address', 'salary'].forEach(field => {
      if (!employeeData[field]) {
        errors.push({
          field,
          message: this.intl.t(`validation.missing.${field}`)
        });
      } else if (!regex[field].test(employeeData[field])) {
        errors.push({
          field,
          message: this.intl.t(`validation.invalid.${field}`)
        });
      }
    });

    return errors;
  }

  generateEmployeeData(numberOfEmployees) {
    const entries = new Array(numberOfEmployees);

    return [...entries].map((entry, index) => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      return {
        firstName,
        lastName,
        id: index + 1,
        email: faker.internet.email(firstName, lastName),
        address: faker.address.streetAddress(true),
        salary: Math.floor(Math.random() * 5000) + 1000
      };
    })
  }
}
