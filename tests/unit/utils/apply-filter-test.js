import { module, test } from 'qunit';
import {
  applyFilter,
  doesProductMatchFilter,
} from 'condition-editor-coding-exercise/utils/apply-filter';

module('Unit | Utility | apply-filter', () => {
  const products = [
    {
      id: 1,
      property_values: [
        { property_id: 0, value: 'Headphones' },
        { property_id: 1, value: 5 },
      ],
    },
    {
      id: 2,
      property_values: [
        { property_id: 0, value: 'Keyboard' },
        { property_id: 1, value: 2 },
      ],
    },
    {
      id: 3,
      property_values: [{ property_id: 0, value: 'Cell Phone' }],
    },
  ];

  test('it filters products by contains', (assert) => {
    const filter = {
      property: { id: 0, type: 'string' },
      operator: { id: 'contains' },
      value: 'phone',
    };

    assert.deepEqual(
      applyFilter(products, filter).map((product) => product.id),
      [1, 3],
    );
  });

  test('it supports numeric comparison operators', (assert) => {
    const filter = {
      property: { id: 1, type: 'number' },
      operator: { id: 'greater_than' },
      value: '3',
    };

    assert.deepEqual(
      applyFilter(products, filter).map((product) => product.id),
      [1],
    );
  });

  test('it supports missing value operator', (assert) => {
    const filter = {
      property: { id: 1, type: 'number' },
      operator: { id: 'none' },
      value: '',
    };

    assert.true(doesProductMatchFilter(products[2], filter));
    assert.false(doesProductMatchFilter(products[0], filter));
  });
});
