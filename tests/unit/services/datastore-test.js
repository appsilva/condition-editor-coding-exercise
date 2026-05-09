import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | datastore', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    window.datastore = {
      getProducts() {
        return [{ id: 1, property_values: [] }];
      },
      getProperties() {
        return [{ id: 1, name: 'Name', type: 'string' }];
      },
      getOperators() {
        return [{ id: 'equals', text: 'Equals' }];
      },
    };
  });

  test('it exposes products, properties and operators', function (assert) {
    const service = this.owner.lookup('service:datastore');

    assert.strictEqual(service.products.length, 1);
    assert.strictEqual(service.properties.length, 1);
    assert.strictEqual(service.operators.length, 1);
  });
});
