import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EmployeeController extends Controller {
  @service employeeService
  @service intl

  @action
  deleteEmployee(employee, e) {
    e.preventDefault()
    e.stopPropagation();

    if (window.confirm(this.intl.t('alert.confirm'))) {
      this.employeeService.deleteEmployee(employee)
      this.transitionToRoute('employees.index')
    }
  }
}
