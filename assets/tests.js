'use strict';

define("employee-manager/tests/acceptance/add-employee-test", ["qunit", "@ember/test-helpers", "ember-qunit", "employee-manager/tests/test-helpers"], function (_qunit, _testHelpers, _emberQunit, _testHelpers2) {
  "use strict";

  (0, _qunit.module)('Acceptance | add employee', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    hooks.beforeEach(async function () {
      this.intl = this.owner.lookup('service:intl');
      this.employeeService = this.owner.lookup('service:employee-service');
      this.persistance = this.owner.lookup('service:persistance');
      (0, _testHelpers2.seedEmployees)(this.employeeService, this.persistance)(0);
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('clicking on "Add Employee" button takes you to new employee form', async function (assert) {
      await (0, _testHelpers.click)('#add_employee_button');
      assert.dom('#new_employee_form').exists('form is displayed');
    });
    (0, _qunit.test)('submitting the form with correct data', async function (assert) {
      await (0, _testHelpers.click)('#add_employee_button');
      await (0, _testHelpers.fillIn)('input#firstName', 'Brand');
      await (0, _testHelpers.fillIn)('input#lastName', 'Newguy');
      await (0, _testHelpers.fillIn)('input#email', 'brand@test.com');
      await (0, _testHelpers.fillIn)('input#address', 'Some Street 12');
      await (0, _testHelpers.fillIn)('input#salary', '1234');
      await (0, _testHelpers.click)('#employee_submit');
      assert.dom('#employee_list #employee_1').hasText('Brand Newguy', 'new entry appears the list');
    });
  });
});
define("employee-manager/tests/acceptance/employee-list-test", ["qunit", "@ember/test-helpers", "ember-qunit", "employee-manager/tests/test-helpers"], function (_qunit, _testHelpers, _emberQunit, _testHelpers2) {
  "use strict";

  (0, _qunit.module)('Acceptance | view employee list', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    hooks.beforeEach(async function () {
      this.intl = this.owner.lookup('service:intl');
      this.employeeService = this.owner.lookup('service:employee-service');
      this.persistance = this.owner.lookup('service:persistance');
      this.seedEmployees = (0, _testHelpers2.seedEmployees)(this.employeeService, this.persistance);
    });
    (0, _qunit.test)('with no employees', async function (assert) {
      this.seedEmployees(0);
      await (0, _testHelpers.visit)('/');
      assert.dom("#no_employees_message").hasText(this.intl.t("employees.none"), "will show empty list message");
    });
    (0, _qunit.test)('with less than six employees', async function (assert) {
      this.seedEmployees(5);
      await (0, _testHelpers.visit)('/');
      assert.dom("#no_employees_message").doesNotExist("no empty list message");

      for (let i = 1; i < 6; i++) {
        assert.dom(`#employee_${i}`).hasText(`Test_${i} Tester_${i}`, `employee ${i} is listed`);
      }

      assert.dom('#next_button').doesNotExist('Next pager button is not visible');
      assert.dom('#prev_button').doesNotExist('Previous pager button is not visible');
    });
    (0, _qunit.test)('with three pages of employees', async function (assert) {
      this.seedEmployees(12); // Test first page

      await (0, _testHelpers.visit)('/');

      for (let i = 1; i < 6; i++) {
        assert.dom(`#employee_${i}`).hasText(`Test_${i} Tester_${i}`, `employee ${i} is listed on page 1`);
      }

      assert.dom('#next_button').exists('Next pager button is visible on page 1');
      assert.dom('#prev_button').doesNotExist('Previous pager button is not visible on page 1');
      await (0, _testHelpers.click)('#next_button'); // Test second page

      for (let i = 6; i < 11; i++) {
        assert.dom(`#employee_${i}`).hasText(`Test_${i} Tester_${i}`, `employee ${i} is listed on page 2`);
      }

      assert.dom('#next_button').exists('Next pager button is visible on page 2');
      assert.dom('#prev_button').exists('Previous pager button is visible on page 2');
      await (0, _testHelpers.click)('#next_button'); // Test third page

      for (let i = 11; i < 13; i++) {
        assert.dom(`#employee_${i}`).hasText(`Test_${i} Tester_${i}`, `employee ${i} is listed on page 3`);
      }

      assert.dom('#next_button').doesNotExist('Next pager button is no visible on page 3');
      assert.dom('#prev_button').exists('Previous pager button is visible on page 3');
    });
    (0, _qunit.test)('calculating salary stats', async function (assert) {
      const salaries = [1224, 3224, 1123];
      const total = salaries.reduce((acc, s) => acc + s, 0);
      const average = (total / salaries.length).toFixed(2);
      this.seedEmployees(3, salaries);
      await (0, _testHelpers.visit)('/');
      assert.dom('#total_salary_calculator p.amount').doesNotExist('total salary is not displayed');
      assert.dom('#average_salary_calculator p.amount').doesNotExist('average salary is not displayed');
      await (0, _testHelpers.click)('#total_salary_calculator button');
      assert.dom('#total_salary_calculator p.amount').hasText(`$ ${total}`, 'after click total salary is visible');
      await (0, _testHelpers.click)('#average_salary_calculator button');
      assert.dom('#average_salary_calculator p.amount').hasText(`$ ${average}`, 'after click average salary is visible');
    });
  });
});
define("employee-manager/tests/acceptance/update-employee-test", ["qunit", "@ember/test-helpers", "ember-qunit", "employee-manager/tests/test-helpers"], function (_qunit, _testHelpers, _emberQunit, _testHelpers2) {
  "use strict";

  (0, _qunit.module)('Acceptance | show, edit and delete employee', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    hooks.beforeEach(async function () {
      this.intl = this.owner.lookup('service:intl');
      this.employeeService = this.owner.lookup('service:employee-service');
      this.persistance = this.owner.lookup('service:persistance');
      (0, _testHelpers2.seedEmployees)(this.employeeService, this.persistance)(1);
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('clicking on entry to view employee details', async function (assert) {
      await (0, _testHelpers.click)('#employee_1');
      assert.dom('h2#full_name').hasText('Test_1 Tester_1', 'full name is correct');
      assert.dom('p#email').hasText('test_1@test.com', 'email is correct');
      assert.dom('address#address_value').hasText('Street No 1', 'address is correct');
      assert.dom('div#salary_value').hasText('$ 1000', 'salary is correct');
    });
    (0, _qunit.test)('clicking on "Edit" button takes you to a pre-populated edit form', async function (assert) {
      await (0, _testHelpers.click)('#employee_1');
      await (0, _testHelpers.click)('#edit_employee_button');
      assert.dom('#edit_employee_form').exists();
      assert.dom('input#firstName').hasValue('Test_1', 'first name is correct');
      assert.dom('input#lastName').hasValue('Tester_1', 'last name is correct');
      assert.dom('input#email').hasValue('test_1@test.com', 'email is correct');
      assert.dom('input#address').hasValue('Street No 1', 'address is correct');
      assert.dom('input#salary').hasValue('1000', 'salary is correct');
    });
    (0, _qunit.test)('submitting a changed form will reflect on the employee page and list', async function (assert) {
      await (0, _testHelpers.click)('#employee_1');
      await (0, _testHelpers.click)('#edit_employee_button');
      await (0, _testHelpers.fillIn)('input#firstName', 'Edita');
      await (0, _testHelpers.click)('#employee_submit');
      assert.dom('h2#full_name').hasText('Edita Tester_1', 'name of employee page is updated');
      await (0, _testHelpers.click)('#link_home');
      assert.dom('#employee_list #employee_1').hasText('Edita Tester_1', 'name on employee list is updated');
    });
    (0, _qunit.test)('deleting an employee will remove him from the list', async function (assert) {
      await (0, _testHelpers.click)('#employee_1'); // auto-confirm delete action

      window.confirm = () => true;

      await (0, _testHelpers.click)('#delete_employee_button');
      assert.dom('#employee_1').doesNotExist('employee is removed from the employee list');
      assert.dom("#no_employees_message").hasText(this.intl.t("employees.none"), "employee list is empty");
    });
  });
});
define("employee-manager/tests/integration/components/employee-form-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  const mockService = (owner, serviceName, mockObject) => {
    const MockService = Ember.Service.extend(mockObject);
    Ember.run(() => {
      owner.unregister(`service:${serviceName}`);
      owner.register(`service:${serviceName}`, MockService);
    });
    return MockService;
  };

  (0, _qunit.module)('Integration | Component | employee-form', {
    before: function () {
      this.formId = "test_employee_form";
      this.employee = {
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@test.com',
        address: 'Street Number 123',
        salary: 1234
      };
      this.formFields = Object.keys(this.employee);
    }
  }, function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.intl = this.owner.lookup('service:intl');
    });
    (0, _qunit.test)('renders correctly with attribute data', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
              <EmployeeForm
                @id={{this.formId}}
                @title="Employee Form"
                @submitLabel="Save"
                @submitCallback={{this.submitForm}}
                @model={{this.employee}}
              />
      */
      {"id":"4scWV/nW","block":"{\"symbols\":[],\"statements\":[[2,\"\\n        \"],[8,\"employee-form\",[],[[\"@id\",\"@title\",\"@submitLabel\",\"@submitCallback\",\"@model\"],[[32,0,[\"formId\"]],\"Employee Form\",\"Save\",[32,0,[\"submitForm\"]],[32,0,[\"employee\"]]]],null]],\"hasEval\":false,\"upvars\":[]}","meta":{}})); // Assert UI Labels

      assert.dom(`#${this.formId} h3`).hasText("Employee Form");
      assert.dom(`#${this.formId} input#employee_submit`).hasValue("Save"); // Assert inputs

      this.formFields.forEach(field => {
        assert.dom(`#${this.formId} label[for=${field}]`).hasText(this.intl.t(`employees.form.${field}`));
        assert.dom(`#${this.formId} input#${field}`).hasValue(`${this.employee[field]}`);
      });
    });
    (0, _qunit.test)('submitting with valid data triggers the submit callback', async function (assert) {
      // Mock employee-service to succeed validation
      mockService(this.owner, 'employee-service', {
        validate: () => []
      });
      this.set('formSubmitted', false);
      this.set('submitForm', () => {
        this.set('formSubmitted', true);
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
              <EmployeeForm
                @id={{this.formId}}
                @title="Employee Form"
                @submitLabel="Save"
                @submitCallback={{this.submitForm}}
                @model={{this.employee}}
              />
      */
      {"id":"4scWV/nW","block":"{\"symbols\":[],\"statements\":[[2,\"\\n        \"],[8,\"employee-form\",[],[[\"@id\",\"@title\",\"@submitLabel\",\"@submitCallback\",\"@model\"],[[32,0,[\"formId\"]],\"Employee Form\",\"Save\",[32,0,[\"submitForm\"]],[32,0,[\"employee\"]]]],null]],\"hasEval\":false,\"upvars\":[]}","meta":{}}));
      await (0, _testHelpers.click)('#employee_submit');
      assert.true(this.formSubmitted);
    });
    (0, _qunit.test)('submitting with invalid data displays errors', async function (assert) {
      // Mock employee-service to fail validation
      mockService(this.owner, 'employee-service', {
        validate: () => [{
          field: 'salary',
          message: 'Invalid value'
        }]
      });
      this.set('formSubmitted', false);
      this.set('submitForm', () => {
        this.set('formSubmitted', true);
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
              <EmployeeForm
                @id={{this.formId}}
                @title="Employee Form"
                @submitLabel="Save"
                @submitCallback={{this.submitForm}}
                @model={{this.employee}}
              />
      */
      {"id":"4scWV/nW","block":"{\"symbols\":[],\"statements\":[[2,\"\\n        \"],[8,\"employee-form\",[],[[\"@id\",\"@title\",\"@submitLabel\",\"@submitCallback\",\"@model\"],[[32,0,[\"formId\"]],\"Employee Form\",\"Save\",[32,0,[\"submitForm\"]],[32,0,[\"employee\"]]]],null]],\"hasEval\":false,\"upvars\":[]}","meta":{}}));
      await (0, _testHelpers.click)('#employee_submit');
      assert.false(this.formSubmitted);
    });
  });
});
define("employee-manager/tests/test-helper", ["employee-manager/app", "employee-manager/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("employee-manager/tests/test-helpers", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.seedEmployees = void 0;

  const seedEmployees = (employeeService, persistanceService) => (entries, salaries = []) => {
    persistanceService.clear();

    for (let i = 1; i < entries + 1; i++) {
      const data = {
        firstName: `Test_${i}`,
        lastName: `Tester_${i}`,
        email: `test_${i}@test.com`,
        address: `Street No ${i}`,
        salary: salaries[i - 1] || 1000
      };
      employeeService.addEmployee(data);
    }
  };

  _exports.seedEmployees = seedEmployees;
});
define("employee-manager/tests/unit/models/employee-test", ["qunit", "ember-qunit", "faker"], function (_qunit, _emberQunit, _faker) {
  "use strict";

  (0, _qunit.module)('Unit | Model | employee', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('can store employee data', function (assert) {
      const employeeData = {
        firstName: _faker.default.name.firstName(),
        lastName: _faker.default.name.lastName(),
        email: _faker.default.internet.email(),
        address: _faker.default.address.streetAddress(true),
        salary: Math.floor(Math.random() * 5000)
      };
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('employee', employeeData);
      assert.ok(model, 'Employee record created successfuly');
      Object.entries(employeeData).forEach(([key, value]) => {
        assert.equal(model[key], value, `${key} corectly recorded`);
      });
    });
  });
});
define("employee-manager/tests/unit/serializers/application-test", ["qunit", "ember-qunit", "employee-manager/tests/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Unit | Serializer | application', {
    before: function () {
      this.employee = {
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@test.com',
        address: 'Street Number 123',
        salary: 1234
      };
    }
  }, function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    hooks.beforeEach(async function () {
      this.employeeService = this.owner.lookup('service:employee-service');
      this.persistance = this.owner.lookup('service:persistance');
      (0, _testHelpers.seedEmployees)(this.employeeService, this.persistance)(0);
    });
    (0, _qunit.test)('it serializes records', function (assert) {
      let store = this.owner.lookup('service:store');
      let record = store.createRecord('employee', this.employee);
      let serializedRecord = record.serialize();
      assert.propEqual(serializedRecord.data.attributes, this.employee, 'serialized atrributes are correct');
      assert.equal(serializedRecord.data.type, 'employees', 'serialized data type is correct');
    });
    (0, _qunit.test)('it normalizes records', async function (assert) {
      let store = this.owner.lookup('service:store');
      let saved = await store.createRecord('employee', this.employee).save();
      let record = await store.findRecord('employee', saved.id);
      assert.equal(record.firstName, this.employee.firstName, 'firstName normalized correctly');
      assert.equal(record.lastName, this.employee.lastName, 'lastName normalized correctly');
      assert.equal(record.email, this.employee.email, 'email normalized correctly');
      assert.equal(record.address, this.employee.address, 'address normalized correctly');
      assert.equal(record.salary, this.employee.salary, 'salary normalized correctly');
    });
  });
});
define("employee-manager/tests/unit/services/employee-service-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | employee_service', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('fetching from an empty store', async function (assert) {
      const service = this.owner.lookup('service:employee-service');
      const all = await service.getAllEmployees();
      const count = service.getEmployeeCount();
      const total = await service.getSalarySum();
      const average = await service.getAverageSalary();
      const {
        employees,
        ...rest
      } = await service.getEmployeesPaginated({
        page: 1
      });
      assert.equal(all.length, 0, 'getAllEmployees returns an empty record');
      assert.equal(employees.length, 0, 'getEmployeesPaginated returns an empty record');
      assert.propEqual(rest, {
        page: 1,
        perPage: 5,
        total: 0
      }, 'getEmployeesPaginated returns correct format');
      assert.equal(count, 0, 'getEmployeeCount returns zero');
      assert.equal(average, 0, 'getAverageSalary returns zero');
      assert.equal(total, 0, 'getSalarySum returns zero');
    });
    (0, _qunit.test)('adding one employee to store', async function (assert) {
      const service = this.owner.lookup('service:employee-service');
      const data = {
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@test.com',
        address: 'Test Street 1',
        salary: 1234
      };
      await service.addEmployee(data);
      const all = await service.getAllEmployees();
      const count = service.getEmployeeCount();
      const total = await service.getSalarySum();
      const average = await service.getAverageSalary();
      const {
        employees,
        ...rest
      } = await service.getEmployeesPaginated({
        page: 1
      });
      assert.equal(all.length, 1, 'getAllEmployees returns a one-item record');
      assert.equal(employees.length, 1, 'getEmployeesPaginated returns a one-item record');
      assert.propEqual(rest, {
        page: 1,
        perPage: 5,
        total: 1
      }, 'getEmployeesPaginated returns correct format');
      assert.equal(count, 1, 'getEmployeeCount returns one');
      assert.equal(average, 1234, 'getAverageSalary is correct');
      assert.equal(total, 1234, 'getSalarySum is correct');
    });
    (0, _qunit.test)('adding two employees to store', async function (assert) {
      const service = this.owner.lookup('service:employee-service');
      const data = [{
        firstName: 'Test_1',
        lastName: 'Tester_1',
        email: 'test_1@test.com',
        address: 'Test Street 1',
        salary: 1200
      }, {
        firstName: 'Test_2',
        lastName: 'Tester_@',
        email: 'test_2@test.com',
        address: 'Test Street 2',
        salary: 1800
      }];
      await service.addEmployee(data[0]);
      await service.addEmployee(data[1]);
      const all = await service.getAllEmployees();
      const count = service.getEmployeeCount();
      const total = await service.getSalarySum();
      const average = await service.getAverageSalary();
      const {
        employees,
        ...rest
      } = await service.getEmployeesPaginated({
        page: 1
      });
      assert.equal(all.length, 2, 'getAllEmployees returns a two-item record');
      assert.equal(employees.length, 2, 'getEmployeesPaginated returns a two-item record');
      assert.propEqual(rest, {
        page: 1,
        perPage: 5,
        total: 2
      }, 'getEmployeesPaginated returns correct format');
      assert.equal(count, 2, 'getEmployeeCount returns two');
      assert.equal(average, 1500, 'getAverageSalary is correct');
      assert.equal(total, 3000, 'getSalarySum is correct');
    });
    (0, _qunit.test)('validating data', async function (assert) {
      const service = this.owner.lookup('service:employee-service');
      const validData = {
        firstName: 'Test_1',
        lastName: 'Tester_1',
        email: 'test_1@test.com',
        address: 'Test Street 1',
        salary: 1200
      };
      const invalidData = {
        firstName: '2',
        lastName: 'Tester_@',
        email: 'test_2@test.com',
        address: 'Test Street 2',
        salary: 'salary'
      };
      const noErrors = service.validate(validData);
      const errors = service.validate(invalidData);
      assert.equal(noErrors.length, 0, 'no errors for valid data');
      assert.equal(errors.length, 2, 'errors for invalid data');
    });
    (0, _qunit.test)('delete employee from store', async function (assert) {
      const service = this.owner.lookup('service:employee-service');
      const data = {
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@test.com',
        address: 'Test Street 1',
        salary: 1234
      };
      const employee = await service.addEmployee(data);
      const all = await service.getAllEmployees();
      assert.equal(all.length, 1, 'after adding we have 1 record');
      await service.deleteEmployee(employee);
      assert.equal(all.length, 0, 'after deleting we have 0 records');
    });
    (0, _qunit.test)('updating employee in store', async function (assert) {
      const service = this.owner.lookup('service:employee-service');
      const data = {
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@test.com',
        address: 'Test Street 1',
        salary: 1234
      };
      const employee = await service.addEmployee(data);
      const update = {
        id: employee.id,
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@test.com',
        address: 'Test Street 1',
        salary: 4321
      };
      await service.updateEmployee(update);
      const updated = await service.getEmployee(employee.id);
      assert.equal(updated.salary, 4321, 'updates employee data');
    });
    (0, _qunit.test)('generate employee data', async function (assert) {
      const service = this.owner.lookup('service:employee-service');
      const employeeData = service.generateEmployeeData(12); // Take random entry

      const data = employeeData[Math.floor(Math.random() * 11)];
      assert.equal(employeeData.length, 12, 'generates correct number of employee data');
      assert.deepEqual(Object.keys(data), ['firstName', 'lastName', 'id', 'email', 'address', 'salary'], 'generated data has valid format');
    });
  });
});
define("employee-manager/tests/unit/services/persistance-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | persistance', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('reading and writing', function (assert) {
      const service = this.owner.lookup('service:persistance');
      const data = ['test', 1, true];
      service.write(data);
      assert.equal(service.data, data, 'data persisted correctly');
      const read = service.read();
      assert.equal(read, data, 'data read correctly');
    });
  });
});
define('employee-manager/config/environment', [], function() {
  var prefix = 'employee-manager';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('employee-manager/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
