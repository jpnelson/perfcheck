import * as React from 'react';
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const MyComponent = () => (
  <Select options={options} />
)

export default [{
    name: 'basic',
    component: MyComponent,
    tests: ['single-tti', 'many-tti', 'bundle-size'],
}]