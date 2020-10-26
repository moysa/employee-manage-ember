import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import faker from 'faker';

module('Unit | Model | employee', function(hooks) {
  setupTest(hooks);

  test('can store employee data', function(assert) {
    const employeeData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(true),
      salary: Math.floor(Math.random() * 5000)
    }

    let store = this.owner.lookup('service:store');
    let model = store.createRecord('employee', employeeData);

    assert.ok(model, 'Employee record created successfuly');

    Object.entries(employeeData).forEach(([key, value]) => {
      assert.equal(model[key], value, `${key} corectly recorded`)
    })
  });
});
