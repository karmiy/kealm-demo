import { Typography } from 'antd';
import styles from './styles.scss';

const CodePreview: React.FC = ({ children }) => {
    return (
        <pre className={styles.pre}>
            <code>
                <Typography.Text copyable>{children}</Typography.Text>
            </code>
        </pre>
    );
};

export default CodePreview;
