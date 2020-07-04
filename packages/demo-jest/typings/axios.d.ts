import axios from 'axios';

declare module 'axios' {
    // 重置 axios.get 类型，兼容 jest.mock
    interface IMockGet {
        <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
        mockResolvedValue(value: any): void;
    }
    export interface AxiosStatic {
        get: IMockGet;
    }
}