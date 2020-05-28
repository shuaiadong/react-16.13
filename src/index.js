// import React from './react';
// import ReactDOM from 'react-dom';
// const React = require('react');
import * as React from 'react';

// import 
// 例子 1
let element = React.createElement('h1', {id: 'h1', style: {color: '#f40'}}, 'hello word!');
console.log(element);
// ReactDOM.render(element, window.root);

// 例子 2
// function funcElement() {
//     return  React.createElement('h1', {id: 'h1', style: {color: '#f40'}}, 'hello word!');
// }
// ReactDOM.render(React.createElement(funcElement, {}), window.root);


// jsx
// 例子3
// ReactDOM.render(<h1 style={{color: '#f40'}}>hello word!</h1>, window.root);

// 例子4
// function FunJsX() {
//     return <h1 style={{color: '#f40'}}>hello word1!</h1>;
// }
// ReactDOM.render(<FunJsX></FunJsX>, window.root);
