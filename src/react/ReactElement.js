import { REACT_ELEMENT_TYPE , REACT_ELEMENT_TEXT} from "../shared/ReactSymbols";

// utils
const hasOwnProperty = Object.hasOwnProperty;

function hasValidRef(config) {
    return config.ref !== undefined;
}

function hasValidKey(config) {
    return config.key !== undefined;
}


const RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
}
/**
 * 
 * @param {*} type      string | function | class | fragment
 * @param {*} config    {ref, key, ...dom.props}
 * @param {*} children  string | Array | ReactElement
 */

export function createElement(type, config, children) {
    let propName;
    const props = {};
    let key = null;
    let ref = null;


    if (config !== null || config !== undefined) {

// 1. 处理 ref
        if (hasValidRef(config)) {
            ref = config.ref;
        }

// 2. 处理key
        if (hasValidKey(config)) {
            key = config.key;
        }

// 3. 处理 props
        for (propName in config) {
            if (
                hasOwnProperty.call(config, propName)
                && !RESERVED_PROPS.hasOwnProperty(propName)
            ) {
                props[propName] = config[propName];
            }
        }
    }

// 4. children
    const childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
        props.children = [children];
    } else if (childrenLength > 1) {
        // **  Array(childrenLength) **
        const childrenArray = Array(childrenLength);
        for (let i = 0; i < childrenLength; i++) {
            childrenArray[i] = arguments[i + 2];
        }
        props.children = childrenArray;
    }

// 5. defaultProps
    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps;
        for (propName in defaultProps) {
            if (props[propName] === undefined) {
                props[props] = defaultProps[propName];
            }
        }
    }

    return ReactElement(
        type,
        key,
        ref,
        // self
        // source
        // owner
        props
    )
}

function ReactElement(type, key, ref, props) {
    let element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key,
        ref: ref,
        props: props
    };
    return element;
}
// ---------------- 简版 实现同样的功能
// export function createElement(type, config = {}, ...children) {
//     const {
//         ref = null,
//         key = null,
//         ...props
//     } = config;

//     props.children = children.length === 1 ? children[0] : children;

//     **只有 class 组件才有 defaultProps**
//     if (type && type.defaultProps) {
//         const defaultProps = type.defaultProps;
//         for (let propName in defaultProps) {
//             if (props[propName] === undefined) {
//                 props[propName] = defaultProps[propName];
//             }
//         }
//     }

//     return ReactElement(type, key, ref, props);
// }