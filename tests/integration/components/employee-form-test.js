import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';
import { run } from '@ember/runloop';

const mockService = (owner, serviceName, mockObject) => {
  const MockService = Service.extend(mockObject);

  run(() => {
    owner.unregister(`service:${serviceName}`);
    owner.register(`service:${serviceName}`, MockService);
  });

  return MockService
}

module('Integration | Component | employee-form',
  {
    before: function() {
      this.formId = "test_employee_form";
      this.employee = {
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@test.com',
        address: 'Street Number 123',
        salary: 1234
      }
      this.formFields = Object.keys(this.employee);
    }
  },
  function(hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function() {
      this.intl = this.owner.lookup('service:intl');
    })

    test('renders correctly with attribute data', async function(assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`
        <EmployeeForm
          @id={{this.formId}}
          @title="Employee Form"
          @submitLabel="Save"
          @submitCallback={{this.submitForm}}
          @model={{this.employee}}
        />`
      );

      // Assert UI Labels
      assert.dom(`#${this.formId} h3`).
        hasText("Employee Form")
      assert.dom(`#${this.formId} input#employee_submit`).
        hasValue("Save")

      // Assert inputs
      this.formFields.forEach(field => {
        assert.dom(`#${this.formId} label[for=${field}]`).
          hasText(this.intl.t(`employees.form.${field}`));

        assert.dom(`#${this.formId} input#${field}`).
          hasValue(`${this.employee[field]}`)
      })
    });

    test('submitting with valid data triggers the submit callback', async function(assert) {

      // Mock employee-service to succeed validation
      mockService(this.owner, 'employee-service', {
        validate: () => []
      })

      this.set('formSubmitted', false)

      this.set('submitForm', () => {
        this.set('formSubmitted', true)
      })

      await render(hbs`
        <EmployeeForm
          @id={{this.formId}}
          @title="Employee Form"
          @submitLabel="Save"
          @submitCallback={{this.submitForm}}
          @model={{this.employee}}
        />`
      );

      await click('#employee_submit')

      assert.true(this.formSubmitted)
    });

    test('submitting with invalid data displays errors', async function(assert) {

      // Mock employee-service to fail validation
      mockService(this.owner, 'employee-service', {
        validate: () => [{ field: 'salary', message: 'Invalid value' }]
      })

      this.set('formSubmitted', false)

      this.set('submitForm', () => {
        this.set('formSubmitted', true)
      })

      await render(hbs`
        <EmployeeForm
          @id={{this.formId}}
          @title="Employee Form"
          @submitLabel="Save"
          @submitCallback={{this.submitForm}}
          @model={{this.employee}}
        />`
      );

      await click('#employee_submit')

      assert.false(this.formSubmitted)
    });
  }
);
