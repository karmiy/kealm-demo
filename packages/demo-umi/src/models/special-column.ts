import { useCallback, useState } from 'react';

interface SpecialColumn {
    title: string;
    tags: Array<string>;
    star: number;
    like: number;
    message: number;
    extra: string;
    content: string;
}

const TITLES = [
    '前端物语',
    'ES2022',
    'React 零基础开发',
    'React Hooks 源码解析',
    'Vue3 核心架构解读',
    'Webpack5 Module Federation',
    'NodeJS 精读指南',
];

const REALMS = [
    'React',
    'Vue',
    'Angular',
    'JavaScript',
    'CSS',
    'ES6',
    'React Native',
    'Webpack',
    'NodeJS',
    'Koa',
    'Jest',
];

const generate = (index: number) => {
    return {
        title: TITLES[index % TITLES.length],
        tags: [...REALMS].sort(() => Math.random() - 0.5).slice(0, Math.ceil(Math.random() * 4)),
        star: Math.floor(Math.random() * 200),
        like: Math.floor(Math.random() * 200),
        message: Math.floor(Math.random() * 20),
        extra: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
        content: `段落示意：${'前端历经数年的快速发展，已是当今互联网不可或缺的存在。'.repeat(4)}`,
    };
};

// 注：src/models 下会被自动编译作为全局 hooks 共享
export default function useSpecialColumnModel() {
    const [data, setData] = useState<Array<SpecialColumn>>(
        [...Array(2).keys()].map(index => generate(index)),
    );

    const generateSpecialColumn = useCallback(() => {
        setData(prev => [...prev, generate(data.length + 1)]);
    }, [data.length]);

    return { specialColumns: data, generateSpecialColumn };
}
