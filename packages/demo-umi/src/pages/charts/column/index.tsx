import { Column } from '@ant-design/plots';
import { Card } from 'antd';
import { DATA } from './constants';

const config = {
    data: DATA,
    xField: 'city',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
        radius: [20, 20, 0, 0],
    },
};

export default function ColumnCharts() {
    return (
        <Card>
            <Column {...config} />
        </Card>
    );
}
