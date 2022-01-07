import { useState } from 'react';

// 注：src/models 下会被自动编译作为全局 hooks 共享
export default function useProductModel() {
    const [product, setProduct] = useState({ id: 1, name: 'apple' });

    return {
        product,
        setProduct,
    };
}
