import { module, test } from 'qunit';
import { visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { seedEmployees } from 'employee-manager/tests/test-helpers';


module('Acceptance | add employee', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    this.intl = this.owner.lookup('service:intl');
    this.employeeService = this.owner.lookup('service:employee-service');
    this.persistance = this.owner.lookup('service:persistance');

    seedEmployees(this.employeeService, this.persistance)(0)

    await visit('/');
  })

  test('clicking on "Add Employee" button takes you to new employee form',
    async function(assert) {
      await click('#add_employee_button')

      assert.dom('#new_employee_form').exists('form is displayed')
    }
  );

  test('submitting the form with correct data',
    async function(assert) {
      await click('#add_employee_button')

      await fillIn('input#firstName', 'Brand')
      await fillIn('input#lastName', 'Newguy')
      await fillIn('input#email', 'brand@test.com')
      await fillIn('input#address', 'Some Street 12')
      await fillIn('input#salary', '1234')

      await click('#employee_submit')

      assert.dom('#employee_list #employee_1').
        hasText('Brand Newguy', 'new entry appears the list')
  });
});

