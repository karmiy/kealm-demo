import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <DefaultFooter
            copyright={`${currentYear} umi + ant design pro 集成`}
            links={[
                {
                    key: 'Ant Design Pro',
                    title: 'Ant Design Pro',
                    href: 'https://pro.ant.design',
                    blankTarget: true,
                },
                {
                    key: 'github',
                    title: <GithubOutlined />,
                    href: 'https://github.com/karmiy/kealm-demo/tree/master/packages/demo-umi',
                    blankTarget: true,
                },
                {
                    key: 'Ant Design',
                    title: 'Ant Design',
                    href: 'https://ant.design',
                    blankTarget: true,
                },
            ]}
        />
    );
};

export default Footer;
