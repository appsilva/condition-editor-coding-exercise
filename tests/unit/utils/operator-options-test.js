import { module, test } from 'qunit';
import { operatorOptionsForProperty } from 'condition-editor-coding-exercise/utils/operator-options';

module('Unit | Utility | operator-options', () => {
  const operators = [
    { id: 'equals', text: 'Equals' },
    { id: 'greater_than', text: 'Is greater than' },
    { id: 'less_than', text: 'Is less than' },
    { id: 'any', text: 'Has any value' },
    { id: 'none', text: 'Has no value' },
    { id: 'in', text: 'Is any of' },
    { id: 'contains', text: 'Contains' },
  ];

  test('it returns valid operators for string properties', (assert) => {
    const property = { id: 1, type: 'string' };
    const result = operatorOptionsForProperty(property, operators);

    assert.deepEqual(
      result.map((operator) => operator.id),
      ['equals', 'any', 'none', 'in', 'contains'],
    );
  });

  test('it returns empty list when property is missing', (assert) => {
    assert.deepEqual(operatorOptionsForProperty(null, operators), []);
  });
});
