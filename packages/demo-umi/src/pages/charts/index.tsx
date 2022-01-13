import { PageContainer } from '@ant-design/pro-layout';
import { IRouteComponentProps } from 'umi';

export default function Charts({ children }: IRouteComponentProps) {
    return <PageContainer>{children}</PageContainer>;
}
