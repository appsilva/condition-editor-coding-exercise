import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, fillIn, select, visit } from '@ember/test-helpers';

module('Acceptance | filtering', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(() => {
    window.datastore = {
      getProducts() {
        return [
          {
            id: 1,
            property_values: [{ property_id: 0, value: 'Headphones' }],
          },
          {
            id: 2,
            property_values: [{ property_id: 0, value: 'Cup' }],
          },
        ];
      },
      getProperties() {
        return [{ id: 0, name: 'Product Name', type: 'string' }];
      },
      getOperators() {
        return [
          { id: 'equals', text: 'Equals' },
          { id: 'contains', text: 'Contains' },
          { id: 'any', text: 'Has any value' },
          { id: 'none', text: 'Has no value' },
          { id: 'in', text: 'Is any of' },
        ];
      },
    };
  });

  test('user can apply and clear filter', async (assert) => {
    await visit('/');

    assert.dom('tbody tr').exists({ count: 2 });

    await select('#property-select', '0');
    await select('#operator-select', 'contains');
    await fillIn('#value-input', 'phone');

    assert.dom('tbody tr').exists({ count: 1 });
    assert.dom('tbody tr').hasTextContaining('Headphones');

    await click('button');

    assert.dom('tbody tr').exists({ count: 2 });
  });
});
