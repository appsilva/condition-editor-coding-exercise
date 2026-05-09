import { helper } from '@ember/component/helper';

export default helper(([collection, item]) => {
  if (!collection) {
    return false;
  }

  if (typeof collection.includes === 'function') {
    return collection.includes(item);
  }

  return false;
});
