import { IRouteComponentProps } from 'umi';

export default function Layout({ children, location }: IRouteComponentProps) {
    // console.log('layout............');
    return (
        <div>
            <h1>{location.pathname === '/login' ? 'Login' : 'Global'} Layout!</h1>
            {children}
        </div>
    );
}
