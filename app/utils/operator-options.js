/**
 * Valid operator ids for each property type.
 *
 * @type {Record<string, Array<string>>}
 */
const VALID_OPERATORS_BY_TYPE = {
  string: ['equals', 'any', 'none', 'in', 'contains'],
  number: ['equals', 'greater_than', 'less_than', 'any', 'none', 'in'],
  enumerated: ['equals', 'any', 'none', 'in'],
};

/**
 * Return supported operator options for a selected property.
 *
 * @param {Object|null} property - The selected property.
 * @param {string|number} property.id - The property identifier.
 * @param {string} property.type - The property type.
 * @param {Array<Object>} operators - All available operator definitions.
 * @param {string} operators[].id - Operator identifier.
 * @returns {Array<Object>} The filtered operator options.
 */
export function operatorOptionsForProperty(property, operators) {
  if (!property) {
    return [];
  }

  const validOperatorIds = VALID_OPERATORS_BY_TYPE[property.type] ?? [];

  return operators.filter((operator) => validOperatorIds.includes(operator.id));
}
