import { Line } from '@ant-design/plots';
import { Card } from 'antd';
import { COLOR_PLATE_10, DATA } from './constants';

const config = {
    data: DATA,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
        label: {
            // 数值格式化为千分位
            formatter: (v: string) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
        },
    },
    color: COLOR_PLATE_10,
    point: {
        shape: ({ category }: Record<string, any>) => {
            return category === 'Gas fuel' ? 'square' : 'circle';
        },
        style: ({ year }: { year: string }) => {
            return {
                r: Number(year) % 4 ? 0 : 3, // 4 个数据示一个点标记
            };
        },
    },
};

export default function LineCharts() {
    return (
        <Card>
            <Line {...config} />
        </Card>
    );
}
