import Service from '@ember/service';

export default class DatastoreService extends Service {
  get products() {
    return window.datastore.getProducts();
  }

  get properties() {
    return window.datastore.getProperties();
  }

  get operators() {
    return window.datastore.getOperators();
  }
}
