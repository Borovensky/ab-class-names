# Dynamic class names for react.

Just a simple thing that allows you to dynamically add or remove style class names.

## Installation

```
npm install ab-class-names --save
```

## Usage

```jsx
import classNames from 'ab-class-names' // you could name import whatever you want

<div className={classNames(
  'container',
  {'redColor': true},
  {'greenColor': false}
)}>
</div>
```