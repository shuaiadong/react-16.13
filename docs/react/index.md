---
title: react
---
## react element 是什么
# 什么是react元素(React.createElement做了什么)？
本文想对react有进一步的了解，所以写了这篇文章
ReactElement即大名鼎鼎的“虚拟DOM”，它是一个普通的对象，描述了一个组件的实例或一个DOM节点及其属性.
1. 什么是React.createElement?
- 在日常开发中经常会用到 `matriks2 h`和`JSX`, 那到底做了什么呢？
```js
// 1. matriks2 
// 2. 路径 @befe/utils/lib/react-helper.js
import {createElement} from 'react';
// 伪代码
 function helper(...args) {
    // ... 省略代码
    return createElement(...args)
}

[
'div',
'span'
//... 
].forEach(tag => helper[tag] = helper.bind(null, tag))
export helper;

```
JSX
在[react官网](https://zh-hans.reactjs.org/docs/introducing-jsx.html#jsx-represents-objects)中也提到[babel](https://www.babeljs.cn/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DYUwLgBCoLYgdpAvBAPAEwJYDcKfUgEQBGAhgE6EB8A5NCHIjagPRbZVA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Ces2016%2Ces2017%2Creact%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3%2Ces2015-loose%2Ctypescript%2Cflow&prettier=false&targets=&version=7.9.6&externalPlugins=)会把JSX转译为一个名为`React.createElement()`
- babel-插件[@babel/plugin-transform-react-jsx](https://www.babeljs.cn/docs/babel-plugin-transform-react-jsx)
```
// jsx
let element = <div id="bar">'element'</div>

// babel 转换后======>
var element = /*#__PURE__*/React.createElement("div", {
  id: "bar"
}, "'element'");

```
让我感觉到万物都是基于createElement。
- 3 那么createElement 到底做了什么，从createElement的返回值开始了解createElement？
- 4[ createElement](https://zh-hans.reactjs.org/docs/react-api.html#creating-react-elements) 的type 一共接收 'string' React组件（function || class） [React fragment](https://zh-hans.reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html)
1. `string` 
```js
    const reactElement = React.createElement(
    'a',
    { href: 'http://wwww.baidu.com' },
    '我是一个A标签'
)
console.log(reactElement);
```
![image](http://note.youdao.com/yws/res/1767/EE6FB14FDE564631BE452D8E5B2B327D)
- function
```
// function component

function functionComp({href}) {
    return React.createElement(
        'a',
        { href},
        '我是一个A标签'
    );
 }
 const functionElement = React.createElement(functionComp, {href: 'http://wwww.baidu.com'})
//  console.log(functionElement) 
```
![image](http://note.youdao.com/yws/res/1770/592AF853150B444C8890F60577DB6907)
 - class component
 ```js
 class classComp extends Component {
    render() {
        return React.createElement(
            'a',
            { href: 'http://wwww.baidu.com' },
            '我是一个A标签'
        )
    }
 }

 const classELe = React.createElement(classComp, {href: 'http://wwww.baidu.com'})
```
![image](http://note.youdao.com/yws/res/1772/4A42FA35216147C5AE5A3D8D7FE1F26B)

- fragment
```js
const ele = React.createElement(React.Fragment, {key: 'fragment'},
  React.createElement(
              'a',
              { href: 'http://wwww.baidu.com' },
              '我是一个A标签'
          )
  )
  console.log(ele)
```
![image](http://note.youdao.com/yws/res/1775/49A14FD67F5648AFAA07AA2B5B21D53E)
可以明显的看到 不管是 string 还是function class 都会被转成一个对象ReactElement
拥有
```js
react.element
{
    $$typeof: '', // 标识React.element
    type: '',     //  string | function | class | REACT_FRAGMENT
    porps: {},    //
    key: null, 
    ref: null,
    // -- 忽略-- prodaction 不出现
    // _owner: null
    // _store: {validated: false}
    // _self: null
    // _source: null 代码所在位置
}
```
### 了解了`createElement`返回值，那我们可以伪造一个React对象吗？
```
     let ele = {
    // $$typeof: ele1.$$typeof,
    $$typeof: Symbol.for('react.element'), //  Symbol.for 与 Symbol的区别
    key: null,
    props: {href:'http://baidu.com', children: ['我是', '一个A标签']},
    ref: null,
    type: 'a',
    // _owner: null,
    // _source: {validated: false},
    // _self: null,
    // _source: null
  }
  
    ReactDOM.render(ele, document.getElementById('root'));

```
![image](http://note.youdao.com/yws/res/1826/F09C58865DA0438C965574519E8BE169)

- 是不是写jsx时，有时会报错 `'React' must be in scope when using JSX`可jsx中也没有用到React的疑问？
- 在 babel中有一
的插件它主要就是将jsx转换成react的方式创建元素。

// createElement
```js
let hasOwnProperty = Object.hasOwnProperty;
let REACT_ELEMENT = Symbol.for('react.element');


function createElement(type, config, children) {
    let propName;
    const props = {};
    let key = null;
    let ref = null;
    
    if(config != null) {
    // 1. 处理key
    if(isValidted(config.key)) {
        key = config.key;
    }
    // 2. 处理ref
    if(isValidted(config.ref)) {
        ref = config.ref;
    }
    // 3. 处理 props dom 上需要的属性 排除 key ref
    for (propName in config) {
        if(
        hasOwmProperty.call(config, propName)
        && propName !== 'key' && propName !== 'ref'
        ) {
            props[propName] = config[propName] 
        }
    }
    }
    
    // 4. 处理children
    // 获取children 的长度
    const childrenLength = arguments.length - 2;
    // 一个孩子的情况 props.chilren = {} || string
    if(childrenLength === 1) {
        props.children = children;
        // 多个的情况react.children = [....]
    } else if(chilrenlength > 1) {
        const childrenArray = Array(childrenLength);
        for(let i = 0; i < childrenLength; i++) {
            childrenArray[i] = arguments[i+2];
        }
        props.children = childrenArray;
    }
    // 5. 处理 class defaultProps
    if(type && type.defaultProps) {
    let defaultProps = type.defaultProps;
        for(propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propsName] = defaultProps[propName]
            }
        }
    }
    
    
    return ReactElememt(
        type,
        key,
        ref,
        props
    )
}


function ReactElement( type,
        key,
        ref,
        props) {
        
        return {
            $$typeof: REACT_ELEMENT,
            type,
            key,
            ref,
            props
        }
}
```