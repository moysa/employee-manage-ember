'use strict';



;define("employee-manager/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("employee-manager/adapters/application", ["exports", "@ember-data/adapter"], function (_exports, _adapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class, _descriptor, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let ApplicationAdapter = (_dec = Ember.inject.service, (_class = (_temp = class ApplicationAdapter extends _adapter.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "persistance", _descriptor, this);
    }

    findAll() {
      return this.persistance.read();
    }

    findRecord(store, type, id) {
      const data = this.persistance.read();
      return data.find(datum => datum.id == id);
    }

    createRecord(store, type, snapshot) {
      const record = this.serialize(snapshot, {
        includeId: true
      }).data;
      const data = this.persistance.read();
      record.id = data.length + 1;
      const newDatum = { ...record.attributes,
        id: record.id
      };
      this.persistance.write([...data, newDatum]);
      return record;
    }

    deleteRecord(store, type, snapshot) {
      const record = this.serialize(snapshot, {
        includeId: true
      }).data;
      const id = snapshot.id;
      const data = this.persistance.read();
      const newData = data.filter(employee => employee.id != id);
      this.persistance.write(newData);
      return record;
    }

    updateRecord(store, type, snapshot) {
      let record = this.serialize(snapshot, {
        includeId: true
      }).data;
      const {
        id,
        attributes
      } = record;
      const data = this.persistance.read();
      const newData = data.map(d => d.id == id ? { ...attributes,
        id
      } : d);
      this.persistance.write(newData);
      return record;
    }

    query(store, type, {
      page,
      perPage
    }) {
      const all = this.persistance.read();
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const data = all.slice(start, end);
      return data;
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "persistance", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class));
  _exports.default = ApplicationAdapter;
});
;define("employee-manager/app", ["exports", "ember-resolver", "ember-load-initializers", "employee-manager/config/environment"], function (_exports, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class App extends Ember.Application {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);

      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);

      _defineProperty(this, "Resolver", _emberResolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("employee-manager/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
});
;define("employee-manager/components/action-button/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <button
    id={{@id}}
    type="button"
    class="button button_{{@color}}"
    {{on 'click' @action}}
  >
    {{@label}}
  </button>

  */
  {"id":"52IM4u7X","block":"{\"symbols\":[\"@id\",\"@color\",\"@action\",\"@label\"],\"statements\":[[11,\"button\"],[16,1,[32,1]],[16,0,[31,[\"button button_\",[32,2]]]],[24,4,\"button\"],[4,[38,0],[\"click\",[32,3]],null],[12],[2,\"\\n  \"],[1,[32,4]],[2,\"\\n\"],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"on\"]}","meta":{"moduleName":"employee-manager/components/action-button/index.hbs"}});

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("employee-manager/components/data-fetcher/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div id={{@id}} class="data-fetcher">
    {{@label}}

    {{#if @data }}
      <p class="amount">
        {{t @translationKey amount=@data}}
      </p>
    {{/if}}
    <br/>
    <ActionButton
      @label={{@actionLabel}}
      @color="grey"
      @action={{@getData}}
    />
  </div>

  */
  {"id":"KnCK4Nmf","block":"{\"symbols\":[\"@data\",\"@translationKey\",\"@id\",\"@label\",\"@actionLabel\",\"@getData\"],\"statements\":[[10,\"div\"],[15,1,[32,3]],[14,0,\"data-fetcher\"],[12],[2,\"\\n  \"],[1,[32,4]],[2,\"\\n\\n\"],[6,[37,1],[[32,1]],null,[[\"default\"],[{\"statements\":[[2,\"    \"],[10,\"p\"],[14,0,\"amount\"],[12],[2,\"\\n      \"],[1,[30,[36,0],[[32,2]],[[\"amount\"],[[32,1]]]]],[2,\"\\n    \"],[13],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"  \"],[10,\"br\"],[12],[13],[2,\"\\n  \"],[8,\"action-button\",[],[[\"@label\",\"@color\",\"@action\"],[[32,5],\"grey\",[32,6]]],null],[2,\"\\n\"],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"t\",\"if\"]}","meta":{"moduleName":"employee-manager/components/data-fetcher/index.hbs"}});

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("employee-manager/components/employee-form/index", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _dec3, _dec4, _class, _descriptor, _descriptor2, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div id={{@id}}>
    <h3>{{@title}}</h3>
    <form  class="employee_form" {{on 'submit' this.submitForm}}>
      <div class="form_input">
        <label for="firstName">{{t "employees.form.firstName"}}</label>
        <Input
          @id="firstName"
          @type="text"
          @value={{@model.firstName}}
          name="firstName"
        />
        <span id="error_firstName" class="error">{{this.firstNameError}}</span>
      </div>
      <div class="form_input">
        <label for="lastName">{{t "employees.form.lastName"}}</label>
        <Input
          @id="lastName"
          @type="text"
          @value={{@model.lastName}}
          name="lastName"
        />
        <span id="error_lastName" class="error">{{this.lastNameError}}</span>
      </div>

      <div class="form_input">
        <label for="email">{{t "employees.form.email"}}</label>
        <Input
          @id="email"
          @type="email"
          @value={{@model.email}}
          name="email"
        />
        <span id="error_email" class="error">{{this.emailError}}</span>
      </div>

      <div class="form_input">
        <label for="address">{{t "employees.form.address"}}</label>
        <Input
          @id="address"
          @type="address"
          @value={{@model.address}}
          name="address"
        />
        <span id="error_address" class="error">{{this.addressError}}</span>
      </div>

      <div class="form_input">
        <label for="salary">{{t "employees.form.salary"}}</label>
        <Input
          @id="salary"
          @type="money"
          @value={{@model.salary}}
          name="salary"
        />
        <span id="error_salary" class="error">{{this.salaryError}}</span>
      </div>

      <Input
        @id="employee_submit"
        @type="submit"
        @value={{@submitLabel}}
        class="submit_button"
      />
    </form>
  </div>

  */
  {"id":"Qtd5rX11","block":"{\"symbols\":[\"@id\",\"@title\",\"@model\",\"@submitLabel\"],\"statements\":[[10,\"div\"],[15,1,[32,1]],[12],[2,\"\\n  \"],[10,\"h3\"],[12],[1,[32,2]],[13],[2,\"\\n  \"],[11,\"form\"],[24,0,\"employee_form\"],[4,[38,0],[\"submit\",[32,0,[\"submitForm\"]]],null],[12],[2,\"\\n    \"],[10,\"div\"],[14,0,\"form_input\"],[12],[2,\"\\n      \"],[10,\"label\"],[14,\"for\",\"firstName\"],[12],[1,[30,[36,1],[\"employees.form.firstName\"],null]],[13],[2,\"\\n      \"],[8,\"input\",[[24,3,\"firstName\"]],[[\"@id\",\"@type\",\"@value\"],[\"firstName\",\"text\",[32,3,[\"firstName\"]]]],null],[2,\"\\n      \"],[10,\"span\"],[14,1,\"error_firstName\"],[14,0,\"error\"],[12],[1,[32,0,[\"firstNameError\"]]],[13],[2,\"\\n    \"],[13],[2,\"\\n    \"],[10,\"div\"],[14,0,\"form_input\"],[12],[2,\"\\n      \"],[10,\"label\"],[14,\"for\",\"lastName\"],[12],[1,[30,[36,1],[\"employees.form.lastName\"],null]],[13],[2,\"\\n      \"],[8,\"input\",[[24,3,\"lastName\"]],[[\"@id\",\"@type\",\"@value\"],[\"lastName\",\"text\",[32,3,[\"lastName\"]]]],null],[2,\"\\n      \"],[10,\"span\"],[14,1,\"error_lastName\"],[14,0,\"error\"],[12],[1,[32,0,[\"lastNameError\"]]],[13],[2,\"\\n    \"],[13],[2,\"\\n\\n    \"],[10,\"div\"],[14,0,\"form_input\"],[12],[2,\"\\n      \"],[10,\"label\"],[14,\"for\",\"email\"],[12],[1,[30,[36,1],[\"employees.form.email\"],null]],[13],[2,\"\\n      \"],[8,\"input\",[[24,3,\"email\"]],[[\"@id\",\"@type\",\"@value\"],[\"email\",\"email\",[32,3,[\"email\"]]]],null],[2,\"\\n      \"],[10,\"span\"],[14,1,\"error_email\"],[14,0,\"error\"],[12],[1,[32,0,[\"emailError\"]]],[13],[2,\"\\n    \"],[13],[2,\"\\n\\n    \"],[10,\"div\"],[14,0,\"form_input\"],[12],[2,\"\\n      \"],[10,\"label\"],[14,\"for\",\"address\"],[12],[1,[30,[36,1],[\"employees.form.address\"],null]],[13],[2,\"\\n      \"],[8,\"input\",[[24,3,\"address\"]],[[\"@id\",\"@type\",\"@value\"],[\"address\",\"address\",[32,3,[\"address\"]]]],null],[2,\"\\n      \"],[10,\"span\"],[14,1,\"error_address\"],[14,0,\"error\"],[12],[1,[32,0,[\"addressError\"]]],[13],[2,\"\\n    \"],[13],[2,\"\\n\\n    \"],[10,\"div\"],[14,0,\"form_input\"],[12],[2,\"\\n      \"],[10,\"label\"],[14,\"for\",\"salary\"],[12],[1,[30,[36,1],[\"employees.form.salary\"],null]],[13],[2,\"\\n      \"],[8,\"input\",[[24,3,\"salary\"]],[[\"@id\",\"@type\",\"@value\"],[\"salary\",\"money\",[32,3,[\"salary\"]]]],null],[2,\"\\n      \"],[10,\"span\"],[14,1,\"error_salary\"],[14,0,\"error\"],[12],[1,[32,0,[\"salaryError\"]]],[13],[2,\"\\n    \"],[13],[2,\"\\n\\n    \"],[8,\"input\",[[24,0,\"submit_button\"]],[[\"@id\",\"@type\",\"@value\"],[\"employee_submit\",\"submit\",[32,4]]],null],[2,\"\\n  \"],[13],[2,\"\\n\"],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"on\",\"t\"]}","meta":{"moduleName":"employee-manager/components/employee-form/index.hbs"}});

  let EmployeeFormComponent = (_dec = Ember.inject.service, _dec2 = Ember._tracked, _dec3 = Ember._action, _dec4 = Ember._action, (_class = (_temp = class EmployeeFormComponent extends _component.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "employeeService", _descriptor, this);

      _initializerDefineProperty(this, "errors", _descriptor2, this);
    }

    get firstNameError() {
      return this.fieldError('firstName');
    }

    get lastNameError() {
      return this.fieldError('lastName');
    }

    get emailError() {
      return this.fieldError('email');
    }

    get addressError() {
      return this.fieldError('address');
    }

    get salaryError() {
      return this.fieldError('salary');
    }

    fieldError(field) {
      const error = this.errors.find(e => e.field === field);
      return error ? error.message : "";
    }

    submitForm(e) {
      e.preventDefault();
      this.errors = this.employeeService.validate(this.args.model);

      if (this.errors.length === 0) {
        this.args.submitCallback();
      }
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "employeeService", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "errors", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _applyDecoratedDescriptor(_class.prototype, "fieldError", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "fieldError"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "submitForm", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "submitForm"), _class.prototype)), _class));
  _exports.default = EmployeeFormComponent;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, EmployeeFormComponent);
});
;define("employee-manager/components/employee-list/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div id={{@id}}>
    <h2>{{t "employees.title"}}</h2>

    {{#each @model.employees as |employee|}}
      <LinkTo
        @id="employee_{{employee.id}}"
        @route="employees.show"
        @model={{employee}}
        class="list_entry"
      >
        {{employee.firstName}} {{employee.lastName}}
      </LinkTo>
    {{else}}
      <h3 id="no_employees_message">{{t "employees.none"}}</h3>
    {{/each}}
  </div>

  */
  {"id":"d/pg2PmR","block":"{\"symbols\":[\"employee\",\"@id\",\"@model\"],\"statements\":[[10,\"div\"],[15,1,[32,2]],[12],[2,\"\\n  \"],[10,\"h2\"],[12],[1,[30,[36,0],[\"employees.title\"],null]],[13],[2,\"\\n\\n\"],[6,[37,2],[[30,[36,1],[[30,[36,1],[[32,3,[\"employees\"]]],null]],null]],null,[[\"default\",\"else\"],[{\"statements\":[[2,\"    \"],[8,\"link-to\",[[24,0,\"list_entry\"]],[[\"@id\",\"@route\",\"@model\"],[[31,[\"employee_\",[32,1,[\"id\"]]]],\"employees.show\",[32,1]]],[[\"default\"],[{\"statements\":[[2,\"\\n      \"],[1,[32,1,[\"firstName\"]]],[2,\" \"],[1,[32,1,[\"lastName\"]]],[2,\"\\n    \"]],\"parameters\":[]}]]],[2,\"\\n\"]],\"parameters\":[1]},{\"statements\":[[2,\"    \"],[10,\"h3\"],[14,1,\"no_employees_message\"],[12],[1,[30,[36,0],[\"employees.none\"],null]],[13],[2,\"\\n\"]],\"parameters\":[]}]]],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"t\",\"-track-array\",\"each\"]}","meta":{"moduleName":"employee-manager/components/employee-list/index.hbs"}});

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("employee-manager/components/footer/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div class="footer">
    {{t "footer.description"}}
  </div>

  */
  {"id":"k/Vz0uUz","block":"{\"symbols\":[],\"statements\":[[10,\"div\"],[14,0,\"footer\"],[12],[2,\"\\n  \"],[1,[30,[36,0],[\"footer.description\"],null]],[2,\"\\n\"],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"t\"]}","meta":{"moduleName":"employee-manager/components/footer/index.hbs"}});

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("employee-manager/components/header/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div class="header">
    <div class="header_content">
      <LinkTo @id="link_home" class="breadcrumb" @route="employees.index">
        {{t "header.linkHome"}}
      </LinkTo>
      <h3>{{t "app.title"}}</h3>
    </div>
  </div>

  */
  {"id":"BpbwM0ON","block":"{\"symbols\":[],\"statements\":[[10,\"div\"],[14,0,\"header\"],[12],[2,\"\\n  \"],[10,\"div\"],[14,0,\"header_content\"],[12],[2,\"\\n    \"],[8,\"link-to\",[[24,0,\"breadcrumb\"]],[[\"@id\",\"@route\"],[\"link_home\",\"employees.index\"]],[[\"default\"],[{\"statements\":[[2,\"\\n      \"],[1,[30,[36,0],[\"header.linkHome\"],null]],[2,\"\\n    \"]],\"parameters\":[]}]]],[2,\"\\n    \"],[10,\"h3\"],[12],[1,[30,[36,0],[\"app.title\"],null]],[13],[2,\"\\n  \"],[13],[2,\"\\n\"],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"t\"]}","meta":{"moduleName":"employee-manager/components/header/index.hbs"}});

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("employee-manager/components/link-button/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    {{#if @model}}
    <LinkTo
      @route={{@route}}
      @model={{@model}}
      id={{@id}}
      class="button button_{{@color}}"
    >
      {{@label}}
    </LinkTo>
  {{else}}
    <LinkTo
      @route={{@route}}
      id={{@id}}
      class="button button_{{@color}}"
    >
      {{@label}}
    </LinkTo>
  {{/if}}

  */
  {"id":"tPp7DyoD","block":"{\"symbols\":[\"@route\",\"@id\",\"@color\",\"@label\",\"@model\"],\"statements\":[[6,[37,0],[[32,5]],null,[[\"default\",\"else\"],[{\"statements\":[[2,\"  \"],[8,\"link-to\",[[16,1,[32,2]],[16,0,[31,[\"button button_\",[32,3]]]]],[[\"@route\",\"@model\"],[[32,1],[32,5]]],[[\"default\"],[{\"statements\":[[2,\"\\n    \"],[1,[32,4]],[2,\"\\n  \"]],\"parameters\":[]}]]],[2,\"\\n\"]],\"parameters\":[]},{\"statements\":[[2,\"  \"],[8,\"link-to\",[[16,1,[32,2]],[16,0,[31,[\"button button_\",[32,3]]]]],[[\"@route\"],[[32,1]]],[[\"default\"],[{\"statements\":[[2,\"\\n    \"],[1,[32,4]],[2,\"\\n  \"]],\"parameters\":[]}]]],[2,\"\\n\"]],\"parameters\":[]}]]]],\"hasEval\":false,\"upvars\":[\"if\"]}","meta":{"moduleName":"employee-manager/components/link-button/index.hbs"}});

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("employee-manager/components/pager/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    {{#unless @isFirstPage }}
    <ActionButton
      @id="prev_button"
      @label="<"
      @color="grey"
      @action={{@toPrevPage}}
    />
  {{/unless}}

  <span id="page_count">
    {{t "employees.pager" current=@page total=@totalPages}}
  </span>

  {{#unless @isLastPage }}
    <ActionButton
      @id="next_button"
      @label=">"
      @color="grey"
      @action={{@toNextPage}}
    />
  {{/unless}}

  */
  {"id":"9ah6EPyE","block":"{\"symbols\":[\"@toNextPage\",\"@toPrevPage\",\"@isFirstPage\",\"@totalPages\",\"@page\",\"@isLastPage\"],\"statements\":[[6,[37,0],[[32,3]],null,[[\"default\"],[{\"statements\":[[2,\"  \"],[8,\"action-button\",[],[[\"@id\",\"@label\",\"@color\",\"@action\"],[\"prev_button\",\"<\",\"grey\",[32,2]]],null],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"\\n\"],[10,\"span\"],[14,1,\"page_count\"],[12],[2,\"\\n  \"],[1,[30,[36,1],[\"employees.pager\"],[[\"current\",\"total\"],[[32,5],[32,4]]]]],[2,\"\\n\"],[13],[2,\"\\n\\n\"],[6,[37,0],[[32,6]],null,[[\"default\"],[{\"statements\":[[2,\"  \"],[8,\"action-button\",[],[[\"@id\",\"@label\",\"@color\",\"@action\"],[\"next_button\",\">\",\"grey\",[32,1]]],null],[2,\"\\n\"]],\"parameters\":[]}]]]],\"hasEval\":false,\"upvars\":[\"unless\",\"t\"]}","meta":{"moduleName":"employee-manager/components/pager/index.hbs"}});

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("employee-manager/components/section-actions/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div class="employee_actions">
    {{yield}}
  </div>

  */
  {"id":"XWREGJQc","block":"{\"symbols\":[\"&default\"],\"statements\":[[10,\"div\"],[14,0,\"employee_actions\"],[12],[2,\"\\n  \"],[18,1,null],[2,\"\\n\"],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}","meta":{"moduleName":"employee-manager/components/section-actions/index.hbs"}});

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("employee-manager/components/section/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div class="section">
    {{yield}}
  </div>

  */
  {"id":"02F3GLu9","block":"{\"symbols\":[\"&default\"],\"statements\":[[10,\"div\"],[14,0,\"section\"],[12],[2,\"\\n  \"],[18,1,null],[2,\"\\n\"],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}","meta":{"moduleName":"employee-manager/components/section/index.hbs"}});

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("employee-manager/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("employee-manager/controllers/employees/edit", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _dec3, _class, _descriptor, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let EmployeeNewController = (_dec = Ember.inject.service, _dec2 = Ember._action, _dec3 = Ember._action, (_class = (_temp = class EmployeeNewController extends Ember.Controller {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "employeeService", _descriptor, this);
    }

    updateEmployee() {
      this.employeeService.updateEmployee(this.model);
      this.transitionToRoute('employees.show', this.model);
    }

    cancelUpdate() {
      this.model.rollbackAttributes();
      this.transitionToRoute('employees.show', this.model);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "employeeService", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "updateEmployee", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "updateEmployee"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cancelUpdate", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "cancelUpdate"), _class.prototype)), _class));
  _exports.default = EmployeeNewController;
});
;define("employee-manager/controllers/employees/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _descriptor, _descriptor2, _descriptor3, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let DashboardController = (_dec = Ember.inject.service, _dec2 = Ember._tracked, _dec3 = Ember._tracked, _dec4 = Ember.computed('model.page'), _dec5 = Ember.computed('model.page', 'totalPages'), _dec6 = Ember.computed('model.total', 'model.perPage'), _dec7 = Ember._action, _dec8 = Ember._action, _dec9 = Ember._action, _dec10 = Ember._action, (_class = (_temp = class DashboardController extends Ember.Controller {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "employeeService", _descriptor, this);

      _initializerDefineProperty(this, "totalSalary", _descriptor2, this);

      _initializerDefineProperty(this, "averageSalary", _descriptor3, this);
    }

    get isFirstPage() {
      return this.model.page === 1;
    }

    get isLastPage() {
      return this.model.page == this.totalPages;
    }

    get totalPages() {
      return Math.ceil(this.model.total / this.model.perPage);
    }

    async getTotalSalary() {
      this.totalSalary = await this.employeeService.getSalarySum();
    }

    async getAverageSalary() {
      this.averageSalary = await this.employeeService.getAverageSalary();
    }

    toNextPage() {
      this.transitionToRoute('employees.index', {
        queryParams: {
          page: this.model.page + 1
        }
      });
    }

    toPrevPage() {
      this.transitionToRoute('employees.index', {
        queryParams: {
          page: this.model.page - 1
        }
      });
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "employeeService", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "totalSalary", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "averageSalary", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "isFirstPage", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "isFirstPage"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isLastPage", [_dec5], Object.getOwnPropertyDescriptor(_class.prototype, "isLastPage"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "totalPages", [_dec6], Object.getOwnPropertyDescriptor(_class.prototype, "totalPages"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getTotalSalary", [_dec7], Object.getOwnPropertyDescriptor(_class.prototype, "getTotalSalary"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getAverageSalary", [_dec8], Object.getOwnPropertyDescriptor(_class.prototype, "getAverageSalary"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toNextPage", [_dec9], Object.getOwnPropertyDescriptor(_class.prototype, "toNextPage"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toPrevPage", [_dec10], Object.getOwnPropertyDescriptor(_class.prototype, "toPrevPage"), _class.prototype)), _class));
  _exports.default = DashboardController;
});
;define("employee-manager/controllers/employees/new", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _dec3, _class, _descriptor, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let EmployeeNewController = (_dec = Ember.inject.service, _dec2 = Ember._action, _dec3 = Ember._action, (_class = (_temp = class EmployeeNewController extends Ember.Controller {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "employeeService", _descriptor, this);
    }

    addEmployee() {
      this.employeeService.addEmployee(this.model);
      this.transitionToRoute('employees.index');
    }

    cancelCreate() {
      this.transitionToRoute('employees.index');
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "employeeService", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "addEmployee", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "addEmployee"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cancelCreate", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "cancelCreate"), _class.prototype)), _class));
  _exports.default = EmployeeNewController;
});
;define("employee-manager/controllers/employees/show", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _dec3, _class, _descriptor, _descriptor2, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let EmployeeController = (_dec = Ember.inject.service, _dec2 = Ember.inject.service, _dec3 = Ember._action, (_class = (_temp = class EmployeeController extends Ember.Controller {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "employeeService", _descriptor, this);

      _initializerDefineProperty(this, "intl", _descriptor2, this);
    }

    deleteEmployee(employee, e) {
      e.preventDefault();
      e.stopPropagation();

      if (window.confirm(this.intl.t('alert.confirm'))) {
        this.employeeService.deleteEmployee(employee);
        this.transitionToRoute('employees.index');
      }
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "employeeService", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "intl", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "deleteEmployee", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "deleteEmployee"), _class.prototype)), _class));
  _exports.default = EmployeeController;
});
;define("employee-manager/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _debug.default;
    }
  });
});
;define("employee-manager/helpers/app-version", ["exports", "employee-manager/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("employee-manager/helpers/format-date", ["exports", "ember-intl/helpers/format-date"], function (_exports, _formatDate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatDate.default;
    }
  });
});
;define("employee-manager/helpers/format-message", ["exports", "ember-intl/helpers/format-message"], function (_exports, _formatMessage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatMessage.default;
    }
  });
});
;define("employee-manager/helpers/format-number", ["exports", "ember-intl/helpers/format-number"], function (_exports, _formatNumber) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatNumber.default;
    }
  });
});
;define("employee-manager/helpers/format-relative", ["exports", "ember-intl/helpers/format-relative"], function (_exports, _formatRelative) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatRelative.default;
    }
  });
});
;define("employee-manager/helpers/format-time", ["exports", "ember-intl/helpers/format-time"], function (_exports, _formatTime) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatTime.default;
    }
  });
});
;define("employee-manager/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("employee-manager/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("employee-manager/helpers/t", ["exports", "ember-intl/helpers/t"], function (_exports, _t) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _t.default;
    }
  });
});
;define("employee-manager/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "employee-manager/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("employee-manager/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("employee-manager/initializers/ember-data-data-adapter", ["exports", "@ember-data/debug/setup"], function (_exports, _setup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _setup.default;
    }
  });
});
;define("employee-manager/initializers/ember-data", ["exports", "ember-data", "ember-data/setup-container"], function (_exports, _emberData, _setupContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
    This code initializes EmberData in an Ember application.

    It ensures that the `store` service is automatically injected
    as the `store` property on all routes and controllers.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("employee-manager/initializers/ember-faker", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {}

  var _default = {
    name: 'ember-faker',
    initialize
  };
  _exports.default = _default;
});
;define("employee-manager/initializers/export-application-global", ["exports", "employee-manager/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("employee-manager/instance-initializers/ember-data", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /* exists only for things that historically used "after" or "before" */
  var _default = {
    name: 'ember-data',

    initialize() {}

  };
  _exports.default = _default;
});
;define("employee-manager/instance-initializers/employee", ["exports", "employee-manager/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize(appInstance) {
    if (_environment.default.environment !== 'test') {
      const employeeService = appInstance.lookup('service:employee-service');
      const employeeData = employeeService.generateEmployeeData(12);
      employeeService.getAllEmployees().then(employees => {
        employees.length === 0 && employeeData.forEach(employee => employeeService.addEmployee(employee));
      });
    }
  }

  var _default = {
    initialize
  };
  _exports.default = _default;
});
;define("employee-manager/models/employee", ["exports", "@ember-data/model"], function (_exports, _model) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _dec3, _dec4, _dec5, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let EmployeeModel = (_dec = (0, _model.attr)('string'), _dec2 = (0, _model.attr)('string'), _dec3 = (0, _model.attr)('string'), _dec4 = (0, _model.attr)('string'), _dec5 = (0, _model.attr)('number'), (_class = (_temp = class EmployeeModel extends _model.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "firstName", _descriptor, this);

      _initializerDefineProperty(this, "lastName", _descriptor2, this);

      _initializerDefineProperty(this, "email", _descriptor3, this);

      _initializerDefineProperty(this, "address", _descriptor4, this);

      _initializerDefineProperty(this, "salary", _descriptor5, this);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "firstName", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "lastName", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "email", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "address", [_dec4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "salary", [_dec5], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class));
  _exports.default = EmployeeModel;
});
;define("employee-manager/router", ["exports", "employee-manager/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class Router extends Ember.Router {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "location", _environment.default.locationType);

      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }

  }

  _exports.default = Router;
  Router.map(function () {
    this.route('employees', {
      path: '/employees'
    }, () => {
      this.route('employees.new', {
        path: '/employees/new'
      });
      this.route('employees.show', {
        path: '/employees/:employee_id'
      }, () => {
        this.route('employees.edit', {
          path: '/employees/:employee_id/edit'
        });
      });
    });
  });
});
;define("employee-manager/routes/employees/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class, _descriptor, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let DashboardRoute = (_dec = Ember.inject.service, (_class = (_temp = class DashboardRoute extends Ember.Route {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "employeeService", _descriptor, this);

      _defineProperty(this, "queryParams", {
        page: {
          refreshModel: true,
          type: 'number'
        }
      });
    }

    beforeModel(transition) {
      // validate that `page` query param value is a positive integer
      // if not, redirect to the first page
      const {
        page
      } = transition.to.queryParams;
      const pageNumber = page && parseInt(page);

      if (!pageNumber || pageNumber <= 0) {
        // Workaround for transition to the same route with updated query params
        // https://github.com/emberjs/ember.js/issues/14875#issuecomment-530749776
        Ember.run(this, () => {
          this.replaceWith({
            queryParams: {
              page: 1
            }
          });
        });
      }
    }

    afterModel(model, transition) {
      // validate that `page` query param value is within `totalPages` range
      // if not, redirect to the last page
      const {
        page
      } = transition.to.queryParams;
      const pageNumber = page && parseInt(page);
      const totalPages = model.total > 0 ? Math.ceil(model.total / model.perPage) : 1;

      if (!pageNumber || pageNumber > totalPages) {
        // Workaround for transition to the same route with updated query params
        // https://github.com/emberjs/ember.js/issues/14875#issuecomment-530749776
        Ember.run(this, () => {
          this.replaceWith({
            queryParams: {
              page: totalPages
            }
          });
        });
      }
    }

    model(params) {
      return this.employeeService.getEmployeesPaginated(params);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "employeeService", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class));
  _exports.default = DashboardRoute;
});
;define("employee-manager/routes/employees/new", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class EmployeeNewRoute extends Ember.Route {
    model() {
      return {
        firstName: null,
        lastName: null,
        email: null,
        address: null,
        salary: null
      };
    }

  }

  _exports.default = EmployeeNewRoute;
});
;define("employee-manager/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
});
;define("employee-manager/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("employee-manager/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
});
;define("employee-manager/serializers/application", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class ApplicationSerializer extends _jsonApi.default {
    keyForAttribute(attr) {
      return Ember.String.camelize(attr);
    }

    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
      const assignRecord = data => {
        const {
          id: dataId,
          ...rest
        } = data;
        return {
          type: primaryModelClass.modelName,
          id: dataId,
          attributes: { ...rest
          }
        };
      };

      const response = {
        data: Array.isArray(payload) ? payload.map(p => assignRecord(p)) : assignRecord(payload)
      };
      return super.normalizeResponse(store, primaryModelClass, response, id, requestType);
    }

  }

  _exports.default = ApplicationSerializer;
});
;define("employee-manager/services/employee-service", ["exports", "faker"], function (_exports, _faker) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _class, _descriptor, _descriptor2, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let EmployeeService = (_dec = Ember.inject.service, _dec2 = Ember.inject.service, (_class = (_temp = class EmployeeService extends Ember.Service {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "store", _descriptor, this);

      _initializerDefineProperty(this, "intl", _descriptor2, this);
    }

    getAllEmployees() {
      return this.store.findAll('employee');
    }

    async getEmployeesPaginated({
      page,
      perPage = 5
    }) {
      const total = await this.getEmployeeCount();
      const employees = this.store.query('employee', {
        page,
        perPage
      });
      return {
        employees,
        page,
        perPage,
        total
      };
    }

    getEmployeeCount() {
      return this.store.peekAll('employee').length;
    }

    async getAverageSalary() {
      const count = await this.getEmployeeCount();
      const total = await this.getSalarySum();
      return count === 0 ? 0 : (total / count).toFixed(2);
    }

    async getSalarySum() {
      const employees = await this.getAllEmployees();
      return employees.content.reduce((acc, employee) => acc + employee.getAttributeValue('salary'), 0);
    }

    getEmployee(id) {
      return this.store.findRecord('employee', id);
    }

    updateEmployee(employeeData) {
      this.store.findRecord('employee', employeeData.id).then(record => {
        record.firstName = employeeData.firstName;
        record.lastName = employeeData.lastName;
        record.email = employeeData.email;
        record.address = employeeData.address;
        record.salary = employeeData.salary;
        record.save();
      });
    }

    addEmployee(employeeData) {
      return this.store.createRecord('employee', employeeData).save();
    }

    deleteEmployee(employee) {
      employee.deleteRecord();
      employee.save();
    }

    clear() {
      return this.getAllEmployees().forEach(this.deleteEmployee);
    }

    validate(employeeData) {
      let errors = [];
      const regex = {
        firstName: /.{3,}/g,
        lastName: /.{3,}/g,
        address: /.{3,}/g,
        email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        salary: /^\d+$/g
      };
      ['firstName', 'lastName', 'email', 'address', 'salary'].forEach(field => {
        if (!employeeData[field]) {
          errors.push({
            field,
            message: this.intl.t(`validation.missing.${field}`)
          });
        } else if (!regex[field].test(employeeData[field])) {
          errors.push({
            field,
            message: this.intl.t(`validation.invalid.${field}`)
          });
        }
      });
      return errors;
    }

    generateEmployeeData(numberOfEmployees) {
      const entries = new Array(numberOfEmployees);
      return [...entries].map((entry, index) => {
        const firstName = _faker.default.name.firstName();

        const lastName = _faker.default.name.lastName();

        return {
          firstName,
          lastName,
          id: index + 1,
          email: _faker.default.internet.email(firstName, lastName),
          address: _faker.default.address.streetAddress(true),
          salary: Math.floor(Math.random() * 5000) + 1000
        };
      });
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "store", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "intl", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class));
  _exports.default = EmployeeService;
});
;define("employee-manager/services/intl", ["exports", "ember-intl/services/intl"], function (_exports, _intl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _intl.default;
    }
  });
});
;define("employee-manager/services/persistance", ["exports", "employee-manager/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class PersistanceService extends Ember.Service {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "data", []);
    }

    read() {
      if (_environment.default.environment === 'test') {
        return this.data;
      } else {
        return JSON.parse(localStorage.getItem(_environment.default.storageKey) || '[]');
      }
    }

    write(input) {
      if (_environment.default.environment === 'test') {
        return this.data = input;
      } else {
        return localStorage.setItem(_environment.default.storageKey, JSON.stringify(input));
      }
    }

    clear() {
      if (_environment.default.environment === 'test') {
        this.data = [];
      } else {
        localStorage.removeItem(_environment.default.storageKey);
      }
    }

  }

  _exports.default = PersistanceService;
});
;define("employee-manager/services/store", ["exports", "ember-data/store"], function (_exports, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
});
;define("employee-manager/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "H51CYZk6",
    "block": "{\"symbols\":[],\"statements\":[[8,\"header\",[],[[],[]],null],[2,\"\\n\"],[10,\"div\"],[14,0,\"content\"],[12],[2,\"\\n  \"],[1,[30,[36,1],[[30,[36,0],null,null]],null]],[2,\"\\n\"],[13],[2,\"\\n\"],[8,\"footer\",[],[[],[]],null],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"-outlet\",\"component\"]}",
    "meta": {
      "moduleName": "employee-manager/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("employee-manager/templates/employees/edit", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "AdVpCxKN",
    "block": "{\"symbols\":[\"@model\"],\"statements\":[[8,\"section\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n  \"],[8,\"section-actions\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n    \"],[8,\"action-button\",[],[[\"@label\",\"@color\",\"@action\"],[[30,[36,0],[\"employees.form.cancel\"],null],\"red\",[32,0,[\"cancelUpdate\"]]]],null],[2,\"\\n  \"]],\"parameters\":[]}]]],[2,\"\\n  \"],[8,\"employee-form\",[],[[\"@id\",\"@title\",\"@submitLabel\",\"@submitCallback\",\"@model\"],[\"edit_employee_form\",[31,[[30,[36,1],[[32,1,[\"firstName\"]]],null],\" \",[30,[36,1],[[32,1,[\"lastName\"]]],null]]],[30,[36,0],[\"employees.form.update\"],null],[32,0,[\"updateEmployee\"]],[32,1]]],null],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"t\",\"unbound\"]}",
    "meta": {
      "moduleName": "employee-manager/templates/employees/edit.hbs"
    }
  });

  _exports.default = _default;
});
;define("employee-manager/templates/employees/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "gRS3jaty",
    "block": "{\"symbols\":[\"@model\"],\"statements\":[[10,\"div\"],[12],[2,\"\\n  \"],[8,\"section\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n    \"],[8,\"section-actions\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n      \"],[8,\"link-button\",[],[[\"@id\",\"@label\",\"@color\",\"@route\"],[\"add_employee_button\",[30,[36,0],[\"employees.add\"],null],\"green\",\"employees.new\"]],null],[2,\"\\n    \"]],\"parameters\":[]}]]],[2,\"\\n    \"],[8,\"pager\",[],[[\"@page\",\"@isFirstPage\",\"@isLastPage\",\"@toPrevPage\",\"@toNextPage\",\"@totalPages\"],[[32,1,[\"page\"]],[32,0,[\"isFirstPage\"]],[32,0,[\"isLastPage\"]],[32,0,[\"toPrevPage\"]],[32,0,[\"toNextPage\"]],[32,0,[\"totalPages\"]]]],null],[2,\"\\n    \"],[8,\"employee-list\",[],[[\"@id\",\"@model\"],[\"employee_list\",[32,1]]],null],[2,\"\\n  \"]],\"parameters\":[]}]]],[2,\"\\n\\n  \"],[8,\"section\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n    \"],[8,\"data-fetcher\",[],[[\"@id\",\"@label\",\"@actionLabel\",\"@translationKey\",\"@data\",\"@getData\"],[\"total_salary_calculator\",[30,[36,0],[\"employees.totalSalary\"],null],[30,[36,0],[\"employees.calculate\"],null],\"money.dollars\",[32,0,[\"totalSalary\"]],[32,0,[\"getTotalSalary\"]]]],null],[2,\"\\n  \"]],\"parameters\":[]}]]],[2,\"\\n\\n  \"],[8,\"section\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n    \"],[8,\"data-fetcher\",[],[[\"@id\",\"@label\",\"@actionLabel\",\"@translationKey\",\"@data\",\"@getData\"],[\"average_salary_calculator\",[30,[36,0],[\"employees.averageSalary\"],null],[30,[36,0],[\"employees.calculate\"],null],\"money.dollars\",[32,0,[\"averageSalary\"]],[32,0,[\"getAverageSalary\"]]]],null],[2,\"\\n  \"]],\"parameters\":[]}]]],[2,\"\\n\"],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"t\"]}",
    "meta": {
      "moduleName": "employee-manager/templates/employees/index.hbs"
    }
  });

  _exports.default = _default;
});
;define("employee-manager/templates/employees/new", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "j2f05zHi",
    "block": "{\"symbols\":[\"@model\"],\"statements\":[[8,\"section\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n  \"],[8,\"section-actions\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n    \"],[8,\"action-button\",[],[[\"@label\",\"@color\",\"@action\"],[[30,[36,0],[\"employees.form.cancel\"],null],\"red\",[32,0,[\"cancelCreate\"]]]],null],[2,\"\\n  \"]],\"parameters\":[]}]]],[2,\"\\n  \"],[8,\"employee-form\",[],[[\"@id\",\"@title\",\"@submitLabel\",\"@submitCallback\",\"@model\"],[\"new_employee_form\",[30,[36,0],[\"employees.form.new\"],null],[30,[36,0],[\"employees.form.create\"],null],[32,0,[\"addEmployee\"]],[32,1]]],null],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"t\"]}",
    "meta": {
      "moduleName": "employee-manager/templates/employees/new.hbs"
    }
  });

  _exports.default = _default;
});
;define("employee-manager/templates/employees/show", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "/aSvvPp8",
    "block": "{\"symbols\":[\"@model\"],\"statements\":[[8,\"section\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n  \"],[8,\"section-actions\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n    \"],[8,\"link-button\",[],[[\"@id\",\"@label\",\"@color\",\"@route\",\"@model\"],[\"edit_employee_button\",[30,[36,0],[\"employees.show.edit\"],null],\"green\",\"employees.edit\",[32,1]]],null],[2,\"\\n    \"],[8,\"action-button\",[],[[\"@id\",\"@label\",\"@color\",\"@action\"],[\"delete_employee_button\",[30,[36,0],[\"employees.show.delete\"],null],\"red\",[30,[36,1],[[32,0,[\"deleteEmployee\"]],[32,1]],null]]],null],[2,\"\\n  \"]],\"parameters\":[]}]]],[2,\"\\n\\n  \"],[10,\"h2\"],[14,1,\"full_name\"],[12],[2,\"\\n    \"],[1,[32,1,[\"firstName\"]]],[2,\" \"],[1,[32,1,[\"lastName\"]]],[2,\"\\n  \"],[13],[2,\"\\n\\n  \"],[10,\"p\"],[14,1,\"email\"],[12],[2,\"\\n    \"],[1,[32,1,[\"email\"]]],[2,\"\\n  \"],[13],[2,\"\\n\\n  \"],[10,\"h3\"],[14,1,\"address_label\"],[12],[2,\"\\n    \"],[1,[30,[36,0],[\"employees.show.address\"],null]],[2,\"\\n  \"],[13],[2,\"\\n  \"],[10,\"address\"],[14,1,\"address_value\"],[12],[2,\"\\n    \"],[1,[32,1,[\"address\"]]],[2,\"\\n  \"],[13],[2,\"\\n\\n  \"],[10,\"h3\"],[14,1,\"salary_label\"],[12],[2,\"\\n    \"],[1,[30,[36,0],[\"employees.show.salary\"],null]],[2,\"\\n  \"],[13],[2,\"\\n  \"],[10,\"div\"],[14,1,\"salary_value\"],[12],[2,\"\\n    \"],[1,[30,[36,0],[\"money.dollars\"],[[\"amount\"],[[32,1,[\"salary\"]]]]]],[2,\"\\n  \"],[13],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"t\",\"fn\"]}",
    "meta": {
      "moduleName": "employee-manager/templates/employees/show.hbs"
    }
  });

  _exports.default = _default;
});
;define("employee-manager/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
});
;define("employee-manager/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
});
;define("employee-manager/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
});
;define("employee-manager/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
});
;define("employee-manager/utils/intl/missing-message", ["exports", "ember-intl/-private/utils/missing-message"], function (_exports, _missingMessage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _missingMessage.default;
    }
  });
});
;

;define('employee-manager/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("employee-manager/app")["default"].create({"name":"employee-manager","version":"0.0.0+c0b4c4e0"});
          }

//# sourceMappingURL=employee-manager.map
