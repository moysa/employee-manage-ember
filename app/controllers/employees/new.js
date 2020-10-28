import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EmployeeNewController extends Controller {
  @service employeeService

  @action
  addEmployee() {
    this.employeeService.addEmployee(this.model)
    this.transitionToRoute('employees.index')
  }

  @action
  cancelCreate() {
    this.transitionToRoute('employees.index')
  }
}
