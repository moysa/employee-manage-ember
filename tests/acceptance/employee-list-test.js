import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { seedEmployees } from 'employee-manager/tests/test-helpers';


module('Acceptance | view employee list',
  function(hooks) {
    setupApplicationTest(hooks);

    hooks.beforeEach(async function() {
      this.intl = this.owner.lookup('service:intl');
      this.employeeService = this.owner.lookup('service:employee-service');
      this.persistance = this.owner.lookup('service:persistance');
      this.seedEmployees = seedEmployees(this.employeeService, this.persistance);
    })

    test('with no employees', async function(assert) {
      this.seedEmployees(0);
      await visit('/');

      assert.dom("#no_employees_message").
        hasText(this.intl.t("employees.none"), "will show empty list message");
    });

    test('with less than six employees', async function(assert) {
      this.seedEmployees(5);

      await visit('/');

      assert.dom("#no_employees_message").doesNotExist("no empty list message");

      for(let i = 1; i < 6; i++) {
        assert.dom(`#employee_${i}`).
          hasText(`Test_${i} Tester_${i}`, `employee ${i} is listed`);
      }

      assert.dom('#next_button').
        doesNotExist('Next pager button is not visible');

      assert.dom('#prev_button').
        doesNotExist('Previous pager button is not visible');
    });

    test('with three pages of employees', async function(assert) {
      this.seedEmployees(12);

      // Test first page

      await visit('/');

      for(let i = 1; i < 6; i++) {
        assert.dom(`#employee_${i}`).
          hasText(`Test_${i} Tester_${i}`, `employee ${i} is listed on page 1`);
      }

      assert.dom('#next_button').
        exists('Next pager button is visible on page 1');

      assert.dom('#prev_button').
        doesNotExist('Previous pager button is not visible on page 1');

      await click('#next_button');

      // Test second page

      for(let i = 6; i < 11; i++) {
        assert.dom(`#employee_${i}`).
          hasText(`Test_${i} Tester_${i}`, `employee ${i} is listed on page 2`);
      }

      assert.dom('#next_button').
        exists('Next pager button is visible on page 2');

      assert.dom('#prev_button').
        exists('Previous pager button is visible on page 2');

      await click('#next_button');

      // Test third page

      for(let i = 11; i < 13; i++) {
        assert.dom(`#employee_${i}`).
          hasText(`Test_${i} Tester_${i}`, `employee ${i} is listed on page 3`);
      }

      assert.dom('#next_button').
        doesNotExist('Next pager button is no visible on page 3');

      assert.dom('#prev_button').
        exists('Previous pager button is visible on page 3');

    });

    test('calculating salary stats', async function(assert) {
      const salaries = [1224, 3224, 1123];
      const total = salaries.reduce((acc, s) => acc+s, 0);
      const average = (total / salaries.length).toFixed(2);

      this.seedEmployees(3, salaries);

      await visit('/');

      assert.dom('#total_salary_calculator p.amount').
        doesNotExist('total salary is not displayed');

      assert.dom('#average_salary_calculator p.amount').
        doesNotExist('average salary is not displayed');

      await click('#total_salary_calculator button')
      assert.dom('#total_salary_calculator p.amount').
        hasText(`$ ${total}`, 'after click total salary is visible');

      await click('#average_salary_calculator button')
      assert.dom('#average_salary_calculator p.amount').
        hasText(`$ ${average}`, 'after click average salary is visible');

    });
});
