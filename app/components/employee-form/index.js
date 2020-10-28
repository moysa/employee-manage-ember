import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class EmployeeFormComponent extends Component {
  @service employeeService

  @tracked errors = []

  get firstNameError() {
    return this.fieldError('firstName')
  }

  get lastNameError() {
    return this.fieldError('lastName')
  }

  get emailError() {
    return this.fieldError('email')
  }

  get addressError() {
    return this.fieldError('address')
  }

  get salaryError() {
    return this.fieldError('salary')
  }

  @action
  fieldError(field) {
    const error = this.errors.find(e => e.field === field)
    return error ? error.message : "";
  }

  @action
  submitForm(e) {
    e.preventDefault();

    this.errors = this.employeeService.validate(this.args.model)

    if (this.errors.length === 0) {
      this.args.submitCallback()
    }
  }
}
