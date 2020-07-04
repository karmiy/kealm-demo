import Mock, { N, B, RandomDateUtilString, S, RandomWebProtocal } from 'mockjs';

// 调整 @types 与官方库不匹配的方法
declare module 'mockjs' {
    interface MockjsRandomBasic {
        boolean(min?: N, max?: N, current?: B): B;
    }

    interface MockjsRandomDate {
        now(util?: RandomDateUtilString, format?: S): S;
    }
    
    interface MockjsRandomWeb {
        protocol(): RandomWebProtocal;
        tld(): S;
    }

    // extend 拓展
    interface ExtendOption {
        [name: string]: (...params: Array<any>) => any;
    }

    interface MockjsRandom {
        constellation(): string;
    }

    interface MockjsRandom {
        extend(option: ExtendOption): void;
    }
}