import { IRouteComponentProps, Redirect } from 'umi';

export default function AuthWrapper(props: IRouteComponentProps) {
    const isLogin = true;

    if (!isLogin) {
        return <Redirect to='/login' />;
    }
    return <div className='auth-wrapper'>{props.children}</div>;
}
