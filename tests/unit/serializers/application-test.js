import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { seedEmployees } from 'employee-manager/tests/test-helpers';


module('Unit | Serializer | application',
  {
    before: function() {
      this.employee = {
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@test.com',
        address: 'Street Number 123',
        salary: 1234
      }
    }
  },
  function(hooks) {
    setupTest(hooks);

    hooks.beforeEach(async function() {
      this.employeeService = this.owner.lookup('service:employee-service');
      this.persistance = this.owner.lookup('service:persistance');

      seedEmployees(this.employeeService, this.persistance)(0);
    })

    test('it serializes records', function(assert) {

      let store = this.owner.lookup('service:store');
      let record = store.createRecord('employee', this.employee);

      let serializedRecord = record.serialize();

      assert.propEqual(serializedRecord.data.attributes, this.employee,
        'serialized atrributes are correct');

      assert.equal(serializedRecord.data.type, 'employees',
        'serialized data type is correct');
    });

    test('it normalizes records', async function(assert) {

      let store = this.owner.lookup('service:store');
      let saved = await store.createRecord('employee', this.employee).save();

      let record = await store.findRecord('employee', saved.id);

      assert.equal(record.firstName, this.employee.firstName,
        'firstName normalized correctly');

      assert.equal(record.lastName, this.employee.lastName,
        'lastName normalized correctly');

      assert.equal(record.email, this.employee.email,
        'email normalized correctly');

      assert.equal(record.address, this.employee.address,
        'address normalized correctly');

      assert.equal(record.salary, this.employee.salary,
        'salary normalized correctly');
    });
});
