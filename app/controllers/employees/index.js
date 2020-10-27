import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class DashboardController extends Controller {
  @service employeeService

  @tracked totalSalary = 0
  @tracked averageSalary = 0

  @computed('model.page')
  get isFirstPage() {
    return this.model.page === 1
  }

  @computed('model.page', 'totalPages')
  get isLastPage() {
    return this.model.page == this.totalPages
  }

  @computed('model.total', 'model.perPage')
  get totalPages() {
    return Math.ceil(this.model.total / this.model.perPage)
  }

  @action
  async getTotalSalary() {
    this.totalSalary =  await this.employeeService.getSalarySum()
  }

  @action
  async getAverageSalary() {
    this.averageSalary = await this.employeeService.getAverageSalary()
  }

  @action
  toNextPage() {
    this.transitionToRoute('employees.index', { queryParams: { page: this.model.page + 1 }})
  }

  @action
  toPrevPage() {
    this.transitionToRoute('employees.index', { queryParams: { page: this.model.page - 1 }})
  }
}
