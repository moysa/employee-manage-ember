import Route from '@ember/routing/route';

export default class EmployeeNewRoute extends Route {
  model() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      address: null,
      salary: null
    }
  }
}
