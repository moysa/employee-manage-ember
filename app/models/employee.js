import Model, { attr } from '@ember-data/model';

export default class EmployeeModel extends Model {
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') email;
  @attr('string') address;
  @attr('number') salary;
}
