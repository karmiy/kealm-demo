// import foo from '@utils/foo';

declare module '@utils/foo' {
    // 兼容 jest.mock
    interface IFoo extends jest.MockInstance<any, any>{
        (): void;
        // mockImplementation: (mockFunc: Function) => void;
    }
    let _foo: IFoo;
    export default _foo;
}