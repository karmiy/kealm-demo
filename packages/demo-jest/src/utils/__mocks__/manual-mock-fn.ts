// 不需要 .genMockFromModule 这里直接把自定义 mock 函数抛出即可
// 而且要注意，因为 @utils/manual-mock-fn 里是 export default 导出，拿到的 manualMockFn 不是我们想要的 manualMockFn 函数，具体如下
// 真的需要用到 .genMockFromModule('@utils/manual-mock-fn') 的话，要 manualMockFn.default 拿到的才是正确的
// let manualMockFn = jest.genMockFromModule('@utils/manual-mock-fn');
function manualMockFn() {
    return 'This fn will be called'
}

export default manualMockFn;