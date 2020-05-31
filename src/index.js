import * as React from './react-source/packages/react';
import * as ReactDOM from './react-source/packages/react-dom';
const h = React.createElement;
class Input extends React.Component {
    render() {
        return h('input', )
    }
}

class List extends React.Component {
    render() {
        return [
            h('span', {}, 'span'),
            h('span', {}, 'span'),
            h('span', {}, 'span'),
             h('button', {}, 'button')]
    }
}

class App extends React.Component {
    render() {
        return <div>
            <Input/>
            <List/>
        </div>
    }
}
ReactDOM.render(<App/>, window.root);