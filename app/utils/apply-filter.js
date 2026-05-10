/**
 * Convert a product's property values into a lookup map.
 *
 * @param {Object} product - The product record.
 * @param {Array<Object>} product.property_values - The product's property values.
 * @param {string|number} product.property_values[].property_id - The property identifier.
 * @param {string|number} product.property_values[].value - The value for the property.
 * @returns {Object<string, string|number|Array>} A map of property_id to property value.
 */
function toValueMap(product) {
  return product.property_values.reduce((map, item) => {
    map[item.property_id] = item.value;
    return map;
  }, {});
}

/**
 * Check whether a value should be treated as present.
 *
 * @param {unknown} value - The value to test.
 * @returns {boolean} True when the value is not null, undefined, or an empty string.
 */
function hasValue(value) {
  return value !== null && value !== undefined && value !== '';
}

/**
 * Parse a value for the "in" operator into a normalized array.
 *
 * @param {string|Array<string|number>} rawValue - The raw filter input.
 * @param {string} propertyType - The property type, such as 'string' or 'number'.
 * @returns {Array<string|number>} The parsed values.
 */
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

/**
 * Compare a product value and filter value for equality.
 *
 * @param {string|number|Array<string|number>} left - The product value.
 * @param {string|number|Array<string|number>} right - The filter target value.
 * @param {string} propertyType - The property type to use for comparison.
 * @returns {boolean} True when the values are equal according to the property type.
 */
function compareEquals(left, right, propertyType) {
  if (Array.isArray(right)) {
    return right.some((r) => compareEquals(left, r, propertyType));
  }
  if (propertyType === 'number') {
    return Number(left) === Number(right);
  }

  return String(left) === String(right);
}

/**
 * Determine whether a product matches a filter.
 *
 * @param {Object} product - The product record.
 * @param {Array<Object>} product.property_values - The product's property values.
 * @param {Object} filter - The filter definition.
 * @param {Object} filter.property - The property used for filtering.
 * @param {string|number} filter.property.id - The ID of the property.
 * @param {string} filter.property.type - The type of the property.
 * @param {Object} filter.operator - The selected operator.
 * @param {string} filter.operator.id - The operator identifier.
 * @param {string|number|Array<string|number>} [filter.value] - The filter value.
 * @returns {boolean} True when the product satisfies the filter.
 */
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

/**
 * Filter a list of products by the provided filter definition.
 *
 * @param {Array<Object>} products - List of products.
 * @param {Object} filter - The filter definition.
 * @returns {Array<Object>} The products that match the filter.
 */
export function applyFilter(products, filter) {
  return products.filter((product) => doesProductMatchFilter(product, filter));
}
