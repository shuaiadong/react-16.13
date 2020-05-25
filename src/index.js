import React from './react';
import ReactDOM from 'react-dom';

let element = React.createElement('h1', {id: 'h1', style: {color: '#f40'}}, 'hello word!');

ReactDOM.render(element, window.root);