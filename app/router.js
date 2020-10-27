import EmberRouter from '@ember/routing/router';
import config from 'employee-manager/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('employees', { path: '/' }, () => {
    this.route('employees.new', { path: '/new' });
    this.route('employees.show', { path: '/:employee_id' }, () => {
      this.route('employees.edit', { path: '/:employee_id/edit'});
    });
  });
});
