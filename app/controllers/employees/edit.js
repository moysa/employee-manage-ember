import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EmployeeNewController extends Controller {
  @service employeeService

  @action
  updateEmployee() {
    this.employeeService.updateEmployee(this.model)
    this.transitionToRoute('employees.show', this.model)
  }

  @action
  cancelUpdate() {
    this.model.rollbackAttributes()
    this.transitionToRoute('employees.show', this.model)
  }
}
