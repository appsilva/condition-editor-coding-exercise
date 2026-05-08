const VALID_OPERATORS_BY_TYPE = {
  string: ['equals', 'any', 'none', 'in', 'contains'],
  number: ['equals', 'greater_than', 'less_than', 'any', 'none', 'in'],
  enumerated: ['equals', 'any', 'none', 'in'],
};

export function operatorOptionsForProperty(property, operators) {
  if (!property) {
    return [];
  }

  const validOperatorIds = VALID_OPERATORS_BY_TYPE[property.type] ?? [];

  return operators.filter((operator) => validOperatorIds.includes(operator.id));
}
