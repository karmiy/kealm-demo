<template>
    <div>
        <el-row class='row-wrap'>
            <el-col>
                <el-card>
                    <h3>中标通知书发出之日起三十日未立合同的批次</h3>
                    <el-row type='flex' justify='space-between'>
                        <el-col>
                            <el-form :inline='true' :model='formInline' size='small'>
                                <el-form-item
                                    label='年度：'
                                    class='item-narrow'
                                >
                                    <el-select
                                        v-model='formInline.year'
                                        placeholder='请选择'
                                        size='small'
                                    >
                                        <el-option
                                            label='2019'
                                            :value='2019'
                                        />
                                        <el-option
                                            label='2020'
                                            :value='2020'
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label='季度：'
                                    class='item-narrow'
                                >
                                    <el-select
                                        v-model='formInline.quarter'
                                        placeholder='请选择'
                                        size='small'
                                    >
                                        <el-option
                                            label='1'
                                            :value='1'
                                        />
                                        <el-option
                                            label='2'
                                            :value='2'
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label='月度：'
                                    class='item-narrow'
                                >
                                    <el-select
                                        v-model='formInline.month'
                                        placeholder='请选择'
                                        size='small'
                                    >
                                        <el-option
                                            label='1'
                                            :value='1'
                                        />
                                        <el-option
                                            label='2'
                                            :value='2'
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col
                            :span='4'
                            class='layout-right'
                        >
                            <span class='deadline'>截止：2020-04-17</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-table
                                :data='contractTableList'
                                height='350'
                            >
                                <el-table-column type='index' />
                                <el-table-column
                                    prop='batchPlanName'
                                    label='批次计划名称'
                                />
                                <el-table-column
                                    prop='batchNumber'
                                    label='批次编号'
                                />
                                <el-table-column
                                    prop='tenderee'
                                    label='招标人'
                                />
                                <el-table-column
                                    prop='bidWinner'
                                    label='中标人'
                                />
                                <el-table-column
                                    prop='changeDate'
                                    label='中标通知书发改日期'
                                />
                                <el-table-column
                                    prop='effectiveness'
                                    label='合同生效结果'
                                />
                                <el-table-column
                                    prop='effectiveDate'
                                    label='合同生效日期'
                                />
                                <el-table-column
                                    prop='issueDateValue'
                                    label='合同生效日期与中标通知书发放日期造值'
                                />
                                <el-table-column
                                    prop='contractAmount'
                                    label='合同金额'
                                />
                            </el-table>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class='layout-right'>
                            <el-pagination
                                layout='prev, pager, next'
                                :current-page='currentPageNoOfContract'
                                :total='contractTableData.length'
                                @current-change='e => currentPageNoOfContract = e'
                            />
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row
            class='row-wrap'
            type='flex'
            :gutter='10'
        >
            <el-col :span='10'>
                <el-card class='card-wrap full-height'>
                    <sg-title>三十日内未签订合同批次统计</sg-title>
                    <el-row>
                        <el-col>
                            <el-form
                                :inline='true'
                                :model='formInline'
                                size='small'
                            >
                                <el-form-item
                                    label='年度：'
                                    class='item-narrow'
                                >
                                    <el-select
                                        v-model='formInline.year'
                                        placeholder='请选择'
                                        size='small'
                                    >
                                        <el-option
                                            label='2019'
                                            :value='2019'
                                        />
                                        <el-option
                                            label='2020'
                                            :value='2020'
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label='季度：'
                                    class='item-narrow'
                                >
                                    <el-select
                                        v-model='formInline.quarter'
                                        placeholder='请选择'
                                        size='small'
                                    >
                                        <el-option
                                            label='1'
                                            :value='1'
                                        />
                                        <el-option
                                            label='2'
                                            :value='2'
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label='月度：'
                                    class='item-narrow'
                                >
                                    <el-select
                                        v-model='formInline.month'
                                        placeholder='请选择'
                                        size='small'
                                    >
                                        <el-option
                                            label='1'
                                            :value='1'
                                        />
                                        <el-option
                                            label='2'
                                            :value='2'
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class='draw-wrap'>
                            <e-echart :opt='option' />
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span='14'>
                <el-card class='card-wrap full-height'>
                    <sg-title>未订立合同批次预警</sg-title>
                    <el-row>
                        <el-col>
                            <el-table :data='warnTableData'>
                                <el-table-column type='index' />
                                <el-table-column
                                    prop='batchPlanName'
                                    label='批次计划名称'
                                />
                                <el-table-column
                                    prop='tenderee'
                                    label='招标人'
                                />
                                <el-table-column
                                    prop='bidWinner'
                                    label='中标人'
                                />
                                <el-table-column
                                    prop='issueDateValue'
                                    label='合同生效日期与中标通知书发放日期造值'
                                />
                            </el-table>
                        </el-col>
                    </el-row>
                    <!-- <el-row>
                        <el-col class="layout-right">
                            <el-pagination
                                layout="prev, pager, next"
                                :current-page="currentPageNoOfWarn"
                                @current-change="e => currentPageNoOfWarn = e"
                                :total="warnTableData.length"
                            ></el-pagination>
                        </el-col>
                    </el-row> -->
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>

/* import EEchart from '@/components/echarts/EEchart';
   import { option } from './option'; */

export default {
    name: 'BidNotification',
    data() {
        return {
            formInline: {
                year: 2019,
                quarter: 1,
                month: 2,
            },
            // 大表
            contractTableData: Array(40).fill({
                batchPlanName: '晨曦·丽景公馆二期（A-03地块）',
                batchNumber: '9388382737182',
                tenderee: '国网福建省电力有限公司',
                bidWinner: '国网福建省电力有限公司',
                changeDate: '2019-11-14',
                effectiveness: 'professor-Alaa',
                effectiveDate: '2019-11-14',
                issueDateValue: '2019-11-14 / 2019-11-14',
                contractAmount: '100000',
            }),
            currentPageNoOfContract: 1,
            currentPageSizeOfContract: 10,
            // 表格：未订立合同批次预警
            warnTableData: Array(5).fill({
                batchPlanName: '晨曦·丽景公馆二期（A-03地块）',
                tenderee: '国网福建电力有限公司',
                bidWinner: '国网福建电力有限公司',
                issueDateValue: '2019-11-14 / 2019-11-14',
            }),

            /* currentPageNoOfWarn: 1,
               currentPageSizeOfWarn: 10, */
        };
    },
    computed: {
        contractTableList() {
            return this.contractTableData.slice(
                (this.currentPageNoOfContract - 1) *
                    this.currentPageSizeOfContract,
                this.currentPageNoOfContract * this.currentPageSizeOfContract
            );
        },

        /* warnTableList() {
            return this.warnTableData.slice(
                (this.currentPageNoOfWarn - 1) *
                    this.currentPageSizeOfWarn,
                this.currentPageNoOfWarn * this.currentPageSizeOfWarn
            );
        } */
    },
};
</script>

<style lang="less" scoped>
.row-wrap {
    margin-bottom: 10px;
}
.item-narrow /deep/.el-input__inner {
    width: 100px;
}
.layout-right {
    text-align: right;
}
// 截止时间
.deadline {
    display: inline-block;
    line-height: 2;
    padding-top: 10px;
    font-size: 12px;
    color: #b9b9b9;
}
.draw-wrap {
    height: 300px;
}
.full-height {
    height: 100%;
}
/* .card-wrap {
    height: 450px;
    overflow: auto;
} */
</style>
