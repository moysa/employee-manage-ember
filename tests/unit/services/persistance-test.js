import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | persistance', function(hooks) {
  setupTest(hooks);

  test('reading and writing', function(assert) {
    const service = this.owner.lookup('service:persistance');

    const data = ['test', 1, true];

    service.write(data);

    assert.equal(service.data, data, 'data persisted correctly');

    const read = service.read();

    assert.equal(read, data, 'data read correctly');

  });
});
