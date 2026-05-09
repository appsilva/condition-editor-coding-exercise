function toValueMap(product) {
  return product.property_values.reduce((map, item) => {
    map[item.property_id] = item.value;
    return map;
  }, {});
}

function hasValue(value) {
  return value !== null && value !== undefined && value !== '';
}

function parseAnyOfValue(rawValue, propertyType) {
  if (Array.isArray(rawValue)) {
    return rawValue.map((item) =>
      propertyType === 'number' ? Number(item) : item,
    );
  }
  return rawValue
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => (propertyType === 'number' ? Number(item) : item));
}

function compareEquals(left, right, propertyType) {
  if (Array.isArray(right)) {
    return right.some((r) => compareEquals(left, r, propertyType));
  }
  if (propertyType === 'number') {
    return Number(left) === Number(right);
  }

  return String(left) === String(right);
}

export function doesProductMatchFilter(product, filter) {
  if (!filter?.property || !filter?.operator) {
    return true;
  }

  const valueMap = toValueMap(product);
  const productValue = valueMap[filter.property.id];
  const filterValue = filter.value ?? '';

  switch (filter.operator.id) {
    case 'any':
      return hasValue(productValue);
    case 'none':
      return !hasValue(productValue);
    case 'equals':
      return (
        hasValue(productValue) &&
        compareEquals(productValue, filterValue, filter.property.type)
      );
    case 'contains':
      return (
        hasValue(productValue) &&
        String(productValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase())
      );
    case 'greater_than':
      return (
        hasValue(productValue) && Number(productValue) > Number(filterValue)
      );
    case 'less_than':
      return (
        hasValue(productValue) && Number(productValue) < Number(filterValue)
      );
    case 'in': {
      const values = parseAnyOfValue(filterValue, filter.property.type);
      return values.some((value) =>
        compareEquals(productValue, value, filter.property.type),
      );
    }
    default:
      return true;
  }
}

export function applyFilter(products, filter) {
  return products.filter((product) => doesProductMatchFilter(product, filter));
}
