let noop = () => {}

// 创建根节点
function legacyCreateRootFromContainer(
    container,   // DOMContainer
    forceHydrate // 是否会复用节点 | 服务端时会用到 | client 第一次渲染没false
) {

}

// 将tree创建到container中
function legacyRenderSubtreeIntoContainer(
    parentComponent,
    element,
    container,
    forceHydrate,
    callback
) {
    let root = container._ReactRootContainer;

    if (!root) {
        root = container._ReactRootContainer = legacyCreateRootFromContainer(container, forceHydrate)
    }
}

const ReactDOM = {
    render(
        element,
        container,
        callback
    ) {
        // 将tree创建到container中
        return legacyRenderSubtreeIntoContainer(
            null,
            element,
            container,
            false,
            callback
        )
    }
}