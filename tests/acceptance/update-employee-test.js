import { module, test } from 'qunit';
import { visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { seedEmployees } from 'employee-manager/tests/test-helpers';


module('Acceptance | show, edit and delete employee', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    this.intl = this.owner.lookup('service:intl');
    this.employeeService = this.owner.lookup('service:employee-service');
    this.persistance = this.owner.lookup('service:persistance');

    seedEmployees(this.employeeService, this.persistance)(1)

    await visit('/')
  })

  test('clicking on entry to view employee details',
    async function(assert) {
      await click('#employee_1');

      assert.dom('h2#full_name').
        hasText('Test_1 Tester_1', 'full name is correct');

      assert.dom('p#email').hasText('test_1@test.com', 'email is correct');

      assert.dom('address#address_value').
        hasText('Street No 1', 'address is correct');

      assert.dom('div#salary_value').hasText('$ 1000', 'salary is correct');
    }
  );

  test('clicking on "Edit" button takes you to a pre-populated edit form',
    async function(assert) {
      await click('#employee_1');

      await click('#edit_employee_button');

      assert.dom('#edit_employee_form').exists();

      assert.dom('input#firstName').hasValue('Test_1', 'first name is correct');
      assert.dom('input#lastName').hasValue('Tester_1', 'last name is correct');
      assert.dom('input#email').hasValue('test_1@test.com', 'email is correct');
      assert.dom('input#address').hasValue('Street No 1', 'address is correct');
      assert.dom('input#salary').hasValue('1000', 'salary is correct');
    }
  );

  test('submitting a changed form will reflect on the employee page and list',
    async function(assert) {
      await click('#employee_1')

      await click('#edit_employee_button')

      await fillIn('input#firstName', 'Edita')

      await click('#employee_submit')

      assert.dom('h2#full_name').
        hasText('Edita Tester_1', 'name of employee page is updated')

      await click('#link_home')

      assert.dom('#employee_list #employee_1').
        hasText('Edita Tester_1', 'name on employee list is updated')
    }
  );

  test('deleting an employee will remove him from the list',
    async function(assert) {
      await click('#employee_1');

      // auto-confirm delete action
      window.confirm = () => true;

      await click('#delete_employee_button');

      assert.dom('#employee_1').
        doesNotExist('employee is removed from the employee list');

      assert.dom("#no_employees_message").
        hasText(this.intl.t("employees.none"), "employee list is empty");
    }
  );
});
