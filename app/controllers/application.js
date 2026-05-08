import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { applyFilter } from 'condition-editor-coding-exercise/utils/apply-filter';
import { operatorOptionsForProperty } from 'condition-editor-coding-exercise/utils/operator-options';

const OPERATORS_WITHOUT_VALUE = ['any', 'none'];

export default class ApplicationController extends Controller {
  @service datastore;

  @tracked selectedPropertyId = '';
  @tracked selectedOperatorId = '';
  @tracked filterValue = '';

  get properties() {
    return this.datastore.properties;
  }

  get products() {
    return this.datastore.products;
  }

  get propertyOptions() {
    return this.properties.map((property) => ({
      id: String(property.id),
      label: `${property.name} (${property.type})`,
    }));
  }

  get selectedProperty() {
    return (
      this.properties.find(
        (property) => String(property.id) === this.selectedPropertyId,
      ) ?? null
    );
  }

  get operatorOptions() {
    return operatorOptionsForProperty(
      this.selectedProperty,
      this.datastore.operators,
    );
  }

  get selectedOperator() {
    return (
      this.operatorOptions.find(
        (operator) => operator.id === this.selectedOperatorId,
      ) ?? null
    );
  }

  get isOperatorSelectDisabled() {
    return !this.selectedProperty;
  }

  get shouldShowValueInput() {
    return this.selectedOperator
      ? !OPERATORS_WITHOUT_VALUE.includes(this.selectedOperator.id)
      : false;
  }

  get isEnumProperty() {
    return this.selectedProperty?.type === 'enumerated';
  }

  get valueInputType() {
    return this.selectedProperty?.type === 'number' ? 'number' : 'text';
  }
  @action updateProperty(event) {
    this.selectedPropertyId = event.target.value;
    this.selectedOperatorId = '';
    this.filterValue = '';
  }

  @action updateOperator(event) {
    this.selectedOperatorId = event.target.value;
    this.filterValue = '';
  }

  @action updateFilterValue(event) {
    this.filterValue = event.target.value;
  }

  @action clearFilter() {
    this.selectedPropertyId = '';
    this.selectedOperatorId = '';
    this.filterValue = '';
  }
}
