import { Button } from 'antd';
import { history, IndexModelState, useDispatch, useSelector } from 'umi';
import styles from './styles.scss';

export default function IndexPage() {
    const indexState = useSelector((state: { index: IndexModelState }) => state.index);
    const dispatch = useDispatch();

    return (
        <div>
            <h1 className={styles.title}>Page index</h1>
            <p>Store: {JSON.stringify(indexState)}</p>
            <Button
                onClick={() => {
                    dispatch({
                        type: 'index/slowUpdateName',
                        payload: 'karloy',
                    });
                }}
            >
                Update Index State
            </Button>
            <Button
                onClick={() => {
                    // history.push('/product');
                    // 链接会带 ?id=xxx
                    // history.push('/product?id=132');
                    history.push({
                        pathname: '/product',
                        query: {
                            id: '132',
                        },
                    });
                }}
            >
                To Product Page
            </Button>
        </div>
    );
}
