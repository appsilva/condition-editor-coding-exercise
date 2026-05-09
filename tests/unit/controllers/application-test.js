import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | application', function (hooks) {
  setupTest(hooks);

  test('it computes filtered products based on selected filter', function (assert) {
    window.datastore = {
      getProducts() {
        return [
          { id: 1, property_values: [{ property_id: 0, value: 'Cup' }] },
          { id: 2, property_values: [{ property_id: 0, value: 'Headphones' }] },
        ];
      },
      getProperties() {
        return [{ id: 0, name: 'Product Name', type: 'string' }];
      },
      getOperators() {
        return [
          { id: 'equals', text: 'Equals' },
          { id: 'contains', text: 'Contains' },
          { id: 'in', text: 'Is any of' },
        ];
      },
    };
    const controller = this.owner.lookup('controller:application');

    controller.selectedPropertyId = '0';
    controller.selectedOperatorId = 'contains';
    controller.filterValue = 'up';

    assert.strictEqual(controller.filteredProducts.length, 1);
  });

  test('clearFilter resets all filter fields', function (assert) {
    window.datastore = {
      getProducts() {
        return [
          { id: 1, property_values: [{ property_id: 0, value: 'Cup' }] },
          { id: 2, property_values: [{ property_id: 0, value: 'Headphones' }] },
        ];
      },
      getProperties() {
        return [{ id: 0, name: 'Product Name', type: 'string' }];
      },
      getOperators() {
        return [
          { id: 'equals', text: 'Equals' },
          { id: 'contains', text: 'Contains' },
          { id: 'in', text: 'Is any of' },
        ];
      },
    };
    const controller = this.owner.lookup('controller:application');

    controller.selectedPropertyId = '0';
    controller.selectedOperatorId = 'equals';
    controller.filterValue = 'Cup';

    controller.clearFilter();

    assert.strictEqual(controller.selectedPropertyId, '');
    assert.strictEqual(controller.selectedOperatorId, '');
    assert.strictEqual(controller.filterValue, '');
  });

  test('it handles multiple selection for enumerated properties', function (assert) {
    window.datastore = {
      getProducts() {
        return [
          { id: 1, property_values: [{ property_id: 0, value: 'Cup' }] },
          { id: 2, property_values: [{ property_id: 0, value: 'Headphones' }] },
        ];
      },
      getProperties() {
        return [{ id: 0, name: 'Product Name', type: 'string' }];
      },
      getOperators() {
        return [
          { id: 'equals', text: 'Equals' },
          { id: 'contains', text: 'Contains' },
          { id: 'in', text: 'Is any of' },
        ];
      },
    };
    const controller = this.owner.lookup('controller:application');

    controller.selectedPropertyId = '0';
    controller.selectedOperatorId = 'in';
    controller.filterValue = ['Cup', 'Headphones'];

    assert.strictEqual(controller.filteredProducts.length, 2);
    assert.strictEqual(controller.filteredProducts[0].id, 1);
    assert.strictEqual(controller.filteredProducts[1].id, 2);
  });
});
