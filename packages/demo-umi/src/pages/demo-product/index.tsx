import React from 'react';
import { IRouteComponentProps, Link, useAccess, useModel } from 'umi';
import { AsyncComponent } from '@/components';
// 也可以 require，就是 MFSU 会警告
import CheckIcon from '@/images/check.png';
import styles from './styles.scss';

function ProductPage(props: IRouteComponentProps) {
    // props 还有如下属性
    // match，当前路由和 url match 后的对象，包含 params、path、url 和 isExact 属性
    // location，表示应用当前处于哪个位置，包含 pathname、search、query 等属性
    // history，同 api#history 接口
    // route，当前路由配置，包含 path、exact、component、routes 等
    // routes，全部路由信息
    // console.log('productPage.props', props);

    const model = useModel('@@initialState');
    const { product, setProduct } = useModel('product');
    // console.log('product', product);
    const access = useAccess();
    // console.log('access', access);

    return (
        <div>
            <h1 className={styles.title}>Product index</h1>
            {/* <img src={require('@/images/check.png')} /> */}
            <img src={CheckIcon} />
            <div className={styles.logo} />
            <AsyncComponent />
            <Link to='/product/detail/13'>To Detail Page</Link>
            <div>
                {/* 传递参数给子路由 */}
                {React.Children.map(props.children, child => {
                    return React.cloneElement(child, { foo: 'bar' });
                })}
            </div>
        </div>
    );
}

// 约定式路由使用
// ProductPage.wrappers = ['@/wrappers/auth'];
// ProductPage.title = '产品页'; // title 会附加到路由配置中
// ProductPage.access = 'canRead';

export default ProductPage;
