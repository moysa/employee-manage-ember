import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

export default class DashboardRoute extends Route {
  @service employeeService

  queryParams = {
    page: {
      refreshModel: true,
      type: 'number'
    }
  };

  beforeModel(transition) {
    // validate that `page` query param value is a positive integer
    // if not, redirect to the first page

    const { page } = transition.to.queryParams
    const pageNumber = page && parseInt(page)

    if (!pageNumber || pageNumber <= 0) {
      // Workaround for transition to the same route with updated query params
      // https://github.com/emberjs/ember.js/issues/14875#issuecomment-530749776
      run(this, () => {
        this.replaceWith({ queryParams: { page: 1 }});
      });
    }
  }

  afterModel(model, transition){
    // validate that `page` query param value is within `totalPages` range
    // if not, redirect to the last page

    const { page } = transition.to.queryParams
    const pageNumber = page && parseInt(page)
    const totalPages = model.total > 0 ?
      Math.ceil(model.total / model.perPage) :
      1

    if (!pageNumber || pageNumber > totalPages) {
      // Workaround for transition to the same route with updated query params
      // https://github.com/emberjs/ember.js/issues/14875#issuecomment-530749776
      run(this, () => {
        this.replaceWith({ queryParams: { page: totalPages }});
      });
    }
  }

  model(params) {
    return this.employeeService.getEmployeesPaginated(params)
  }
}
