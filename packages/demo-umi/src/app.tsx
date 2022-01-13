import React from 'react';
// import { IConfigFromPlugins } from '@@/core/pluginConfig';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { PageLoading } from '@ant-design/pro-layout';
import {
    History,
    history,
    IRouteComponentProps,
    Link,
    Location,
    Plugin,
    RunTimeLayoutConfig,
} from 'umi';
import { sleep } from '@/utils/base';
import { getCurrentUser } from './services/user';
import { Footer, RightContent } from './components';

// console.log('entry app');

const isDev = process.env.NODE_ENV === 'development';
const LOGIN_PATH = '/login';

/**
 * 执行顺序：render => patchRoutes => onRouteChange
 */

/* -------------------- BLOCK: render 可控 -------------------- */
export async function render(oldRender: Function) {
    // console.log('render');

    // 场景：做鉴权
    // await sleep();
    // Math.random() > 0.5 && history.push('/login');
    oldRender();
}

/* -------------------- BLOCK: 路由动态控制 -------------------- */
export function patchRoutes({ routes }: { routes: UmiNS.Route }) {
    // 场景：路由是接口返回，在 render 中请求中此处动态添加路由（动态添加的路由不会在默认的 layout 里，即是全屏的而不是作为菜单展示内容）
    // 注：约定式路由就不能这样操作了
    /* routes?.unshift({
        path: '/login',
        exact: true,
        component: require('@/pages/login').default,
    }); */
    // console.log('routes', routes);
}

/* -------------------- BLOCK: 路由变化监听 -------------------- */
// 初始也会执行
export function onRouteChange({
    location,
    routes,
    matchedRoutes,
    action,
}: UmiNS.RouteChangeParams) {
    // console.log(location, routes, matchedRoutes, action);
}

/* -------------------- BLOCK: 根节点渲染 -------------------- */
const DEFAULT_THEME = { textColor: '#323232' };
const ThemeContext = React.createContext(DEFAULT_THEME);

// 场景：修改交给 react-dom 渲染时的根组件
// 比如用于在外面包一个 Provider
export function rootContainer(
    container: React.ComponentType,
    // args: { history: History; plugin: Plugin; routes: UmiNS.Route[] },
) {
    // console.log(container, args);
    const Provider = ({ children, routes }: IRouteComponentProps) => {
        // 需要往下再传 routes，不然如 access 权限在 route 那配的下不去
        const _children = React.cloneElement(children, {
            ...children.props,
            routes,
        });

        return <ThemeContext.Provider value={DEFAULT_THEME}>{_children}</ThemeContext.Provider>;
    };
    return React.createElement(Provider, null, container);
}

/* -------------------- BLOCK: @umijs/plugin-initial-state -------------------- */
// 如果 getInitialState 有异步操作，如下面 sleep，那会阻塞页面渲染导致白屏
// initialStateConfig 即可解决这个问题，配置 loading 会使其在 getInitialState 解决前展示 loading 效果
export const initialStateConfig = {
    loading: <PageLoading />,
};

export async function getInitialState() {
    // 会阻塞页面渲染，且在懒加载路由 js 文件前
    // await sleep(2000);

    const fetchUserInfo = async () => {
        try {
            const msg = await getCurrentUser();
            return msg.data;
        } catch (error) {
            history.push(LOGIN_PATH);
        }
        return undefined;
    };

    // 如果是登录页面，不执行
    if (history.location.pathname !== LOGIN_PATH) {
        const currentUser = await fetchUserInfo();
        return {
            fetchUserInfo,
            currentUser,
            settings: {},
        };
    }
    return {
        fetchUserInfo,
        settings: {},
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// 也可以看这边配置 https://umijs.org/zh-CN/plugins/plugin-layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
    return {
        // title: '这是标题', // 定制 document.title
        // iconfontUrl: '//at.alicdn.com/t/XXX.js', // 配置 iconfont 链接，也对应了 routes 那的菜单 icon 图标，可见 https://pro.ant.design/zh-CN/docs/new-page#%E5%9C%A8%E8%8F%9C%E5%8D%95%E4%B8%AD%E4%BD%BF%E7%94%A8-iconfont
        rightContentRender: () => <RightContent />,
        disableContentMargin: true, // 移除内容部分的 margin: 24px
        waterMarkProps: {
            // 水印，页面中 <PageContainer> 会生成一个 .ant-pro-layout-watermark-wrapper 的 background
            content: initialState?.currentUser?.name,
        },
        footerRender: () => <Footer />, // 会在 content 下补充内容
        onPageChange: () => {
            // 页面/路由变化时触发，初始也会执行
            const { location } = history;
            // 如果没有登录，重定向到 login
            if (!initialState?.currentUser && location.pathname !== LOGIN_PATH) {
                history.push(LOGIN_PATH);
            }
        },
        links: isDev
            ? [
                  <Link to='/umi/plugin/openapi' target='_blank'>
                      <LinkOutlined />
                      <span>OpenAPI 文档</span>
                  </Link>,
                  <Link to='/~docs'>
                      <BookOutlined />
                      <span>业务组件文档</span>
                  </Link>,
              ]
            : [],
        menuHeaderRender: undefined, // 菜单头部（图标 + Umi Menus 那个）
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>, // access 没权限时（如 route 配置了 access canRead），显示的页面
        // 增加一个 loading 的状态
        childrenRender: (children, props) => {
            // console.log('initialState', initialState);
            // if (initialState?.loading) return <PageLoading />;

            return (
                <>
                    {children}
                    {/* {!props.location?.pathname?.includes('/login') && (
                        <SettingDrawer
                            enableDarkTheme
                            settings={initialState?.settings}
                            onSettingChange={settings => {
                                setInitialState(preInitialState => ({
                                    ...preInitialState,
                                    settings,
                                }));
                            }}
                        />
                    )} */}
                </>
            );
        },
        ...initialState?.settings,
    };
};
