# Product Filtering Condition Editor (Ember)

This is an implementation of the condition editor exercise using Ember.js and Vite.

The app lets a user create one filter in the form:

`[property] [operator] [value]`

Then it updates the product list immediately. The "clear filter" button triggers the action that resets the filter and shows all products again.

## Running the project

- Install dependencies: `yarn install`
- Start locally: `yarn start`
- Run tests: `yarn test`
- Optional lint checks: `yarn lint`
- Build for production: `yarn build`

## Prerequisites

You will need the following things properly installed on your computer:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Guided tour

### Data source

- The provided `datastore.js` is loaded in `index.html`, and the app reads from `window.datastore`.
- `app/services/datastore.js` is a small wrapper service providing access to products, properties, and operators.

### Filter behavior

- `app/controllers/application.js` owns filter state:
  - selected property ID
  - selected operator ID
  - filter value input
- It computes valid operators for the chosen property type via `operatorOptionsForProperty()`.
- It computes the filtered product list from the active filter.
- It supports resetting the filters by clicking on "CLear filter" button.
- It handles both single-value inputs (string/number) and multi-select for enumerated properties.

### Filtering logic

- `app/utils/operator-options.js` maps property types to valid operators from the spec.
- `app/utils/apply-filter.js` applies the filter and supports:
  - `equals` - exact match (supports array values for multi-select)
  - `greater_than` - numeric comparison
  - `less_than` - numeric comparison
  - `any` - product has any value for the property
  - `none` - product has no value for the property
  - `in` - product value is in the provided list
  - `contains` - case-insensitive substring match

### UI structure

- `app/templates/application.hbs` contains the filter panel and products table.
- `app/styles/app.css` adds minimal structure and spacing aligned with the wireframes.
- Dynamic input types (text/number) and conditional select dropdowns (for enumerated properties) based on the selected property type.
- `app/helpers/includes.js` is a custom helper used to check if a value is in an array, supporting multi-select value highlighting in enumerated property dropdowns.

## Tests

Tests are included for each custom part introduced in this solution:

- `tests/unit/services/datastore-test.js` - validates the datastore service wrapper
- `tests/unit/utils/operator-options-test.js` - tests operator filtering by property type
- `tests/unit/utils/apply-filter-test.js` - tests all filter operators and edge cases
- `tests/unit/controllers/application-test.js` - tests filter state management and computed properties
- `tests/acceptance/filtering-test.js` - end-to-end test of the complete filter workflow

The acceptance test verifies the full user flow: apply a filter, verify results update, and clear the filter to reset.

## Development notes

This solution is intentionally kept simple and maintainable:

- one controller for state management
- one small service for data access
- two small utilities for filter rules and execution
- plain hbs and CSS
- TypeScript setup and configuration would've added unnecessary overhead for a focused coding exercise, so I kept everything in JS, to allow for faster iterations. Nevertheless, I added JSDoc comments to the utility functions, to help explain each function's goal.

It probably took me around 5/6 hours to have the challenge in a submitting state.

## Key assumptions

- Property types and operators are static (as stated in the guide).
- `contains` matching is case-insensitive.
- `in` operator supports both single and multiple values through array notation or comma-separated value list.
- Enumerated properties use a multi-select input for values.
- Missing product values count as no value for the property.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [Vite](https://vite.dev)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
