<template>
    <div>
        <el-row :gutter="20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-user-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{countcase}}</div>
                                    <div>已创建用例</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-s-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{countreport}}</div>
                                    <div>已生成报告</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div ref="cpuChart"  :style="{width: '100%', height: '300px'}"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div ref="memChart"  :style="{width: '100%', height: '300px'}"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <h6>网络流量(kb)</h6>
                    <div id="load" ref="loadChart"  :style="{width: '100%', height: '250px'}"></div>
                </el-card>
                <el-card shadow="hover">
                    <h6>负载情况</h6>
                    <div ref="netChart"  :style="{width: '100%', height: '250px'}"></div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover">
                    <h6>Top命令信息</h6>
                    <el-table
                        :data="topData"
                        stripe
                        style="width: 100%"
                        height="250">
                        <el-table-column
                            prop="PID"
                            label="PID"
                            min-width="50">
                        </el-table-column>
                        <el-table-column
                            prop="USER"
                            label="USER"
                            min-width="60">
                        </el-table-column>
                        <el-table-column
                            prop="%CPU"
                            label="CPU(%)"
                            min-width="60">
                        </el-table-column>
                        <el-table-column
                            prop="%MEM"
                            label="MEM(%)"
                            min-width="60">
                        </el-table-column>
                        <el-table-column
                            prop="COMMAND"
                            label="COMMAND"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            prop="Time"
                            label="Time">
                        </el-table-column>
                    </el-table>
                </el-card>
                <el-card shadow="hover">
                    <h6>磁盘使用情况</h6>
                    <el-table
                            :data="dfData"
                            stripe
                            style="width: 100%"
                            height="250">
                        <el-table-column
                            prop="Filesystem"
                            label="Filesystem"
                            min-width="90">
                        </el-table-column>
                        <el-table-column
                            prop="Available"
                            label="Size"
                            min-width="60">
                        </el-table-column>
                        <el-table-column
                            prop="Available"
                            label="Used"
                            min-width="60">
                        </el-table-column>
                        <el-table-column
                            prop="Available"
                            label="Available"
                            min-width="60">
                        </el-table-column>
                        <el-table-column
                            prop="Use"
                            label="Use(%)"
                            min-width="60">
                        </el-table-column>
                        <el-table-column
                            prop="Time"
                            label="Time">
                        </el-table-column>
                    </el-table>
                </el-card>
             </el-col>
            </el-row>
    </div>
</template>

<script>
import {cpu, mem, load, top, net, df, countTestCases, countReports} from "../api/index"
import * as echarts from 'echarts'
export default {
    name: "dashboard",
    data() {
        return {
            name: localStorage.getItem("ms_username"),
            countcase: 0,
            countreport: 0,
            options: {
                title: {
                    text: 'MEM趋势图'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        var relVal = params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + '%'
                        }
                        return relVal;
                        }            
                },
                legend: {
                    data: ['mem_used', 'mem_cache', 'mem_buffer']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: 'mem_used',
                    type: 'line',
                    // stack: 'Total',
                    data: [10, 12, 11, 74, 90, 30, 210]
                    },
                    {
                    name: 'mem_cache',
                    type: 'line',
                    // stack: 'Total',
                    data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                    name: 'mem_buffer',
                    type: 'line',
                    // stack: 'Total',
                    data: [20, 82, 91, 34, 90, 130, 30]
                    }
                ]
            },
            options2: {
                title: {
                    text: 'CPU趋势图'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        var relVal = params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + '%'
                        }
                        return relVal;
                        }            
                },
                legend: {
                    data: ['US', 'SY', 'Free']
                },
                // axisLabel: {
                //     interval: 0,
                //     rotate: 35
                //     },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'US',
                        type: 'line',
                        // stack: 'Total',
                        data: [1, 2, 5, 9, 2]
                    },{
                        name: 'SY',
                        type: 'line',
                        // stack: 'Total',
                        data: [2, 3, 8, 1, 4]
                    },{
                        name: 'Free',
                        type: 'line',
                        // stack: 'Total',
                        data: [8, 2, 2, 1 ,5]
                    }
                ]
            },
            options3: {
                title: {
                    text: 'load趋势图'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        var relVal = params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value
                        }
                        return relVal;
                        }            
                },
                legend: {
                    data: ['load_5', 'load_10', 'load_15']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: 'load_5',
                    type: 'line',
                    // stack: 'Total',
                    showSymbol: false,
                    data: [10, 12, 11, 74, 90, 30, 210]
                    },
                    {
                    name: 'load_10',
                    type: 'line',
                    // stack: 'Total',
                    showSymbol: false,
                    data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                    name: 'load_15',
                    type: 'line',
                    // stack: 'Total',
                    showSymbol: false,
                    data: [20, 82, 91, 34, 90, 130, 30]
                    }
                ]
            },
            options4: {
                title: {
                    text: 'NET趋势图'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        var relVal = params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + 'Kb/s'
                        }
                        return relVal;
                        }            
                    },
                legend: {
                    data: ['RX', 'TX']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    // type: 'category',
                    // boundaryGap: false,
                    data: ['21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25',
                    '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25',
                    '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25', '21:43:25'
                    ] 
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: 'RX',
                    type: 'line',
                    // stack: 'Total',
                    showSymbol: false,
                    data: [10, 12, 11, 74, 90, 30, 210, 12, 11, 74, 11, 74, 10, 12, 11, 74, 90, 30, 210, 12, 11, 74, 11, 74, 
                    10, 12, 11, 74, 90, 30, 210, 12, 11, 74, 11, 74, 10, 12, 11, 74, 90, 30, 210, 12, 11, 74, 11, 74,
                    10, 12, 11, 74, 90, 30, 210, 12, 11, 74, 11, 74, 10, 12, 11, 74, 90, 30, 210, 12, 11, 74, 11, 74
                    ]
                    },
                    {
                    name: 'TX',
                    type: 'line',
                    // stack: 'Total',
                    showSymbol: false,
                    data: [20, 82, 91, 34, 90, 130, 30, 82, 91, 34, 91, 34, 20, 82, 91, 34, 90, 130, 30, 82, 91, 34, 91, 34,
                    20, 82, 91, 34, 90, 130, 30, 82, 91, 34, 91, 34, 20, 82, 91, 34, 90, 130, 30, 82, 91, 34, 91, 34,
                    20, 82, 91, 34, 90, 130, 30, 82, 91, 34, 91, 34, 20, 82, 91, 34, 90, 130, 30, 82, 91, 34, 91, 34]
                    }
                ]
            },
            topData: [
                {
                "PID": "9",
                "USER": "root",
                "%CPU": "6.2",
                "%MEM": "0.0",
                "COMMAND": "rcu_sched",
                "Time": "2022-03-20 00:15:01\n"
                },
                {
                "PID": "1",
                "USER": "root",
                "%CPU": "0.0",
                "%MEM": "0.2",
                "COMMAND": "systemd",
                "Time": "2022-03-20 00:15:01\n"
                },
                {
                "PID": "2",
                "USER": "root",
                "%CPU": "0.0",
                "%MEM": "0.0",
                "COMMAND": "kthreadd",
                "Time": "2022-03-20 00:15:01\n"
                },
                {
                "PID": "3",
                "USER": "root",
                "%CPU": "0.0",
                "%MEM": "0.0",
                "COMMAND": "ksoftirqd+",
                "Time": "2022-03-20 00:15:01\n"
                },
                {
                "PID": "5",
                "USER": "root",
                "%CPU": "0.0",
                "%MEM": "0.0",
                "COMMAND": "kworker/0+",
                "Time": "2022-03-20 00:15:01\n"
                },
                {
                "PID": "7",
                "USER": "root",
                "%CPU": "0.0",
                "%MEM": "0.0",
                "COMMAND": "migration+",
                "Time": "2022-03-20 00:15:01\n"
                },
                {
                "PID": "8",
                "USER": "root",
                "%CPU": "0.0",
                "%MEM": "0.0",
                "COMMAND": "rcu_bh",
                "Time": "2022-03-20 00:15:01\n"
                },
                {
                "PID": "10",
                "USER": "root",
                "%CPU": "0.0",
                "%MEM": "0.0",
                "COMMAND": "lru-add-d+",
                "Time": "2022-03-20 00:15:01\n"
                },
                {
                "PID": "11",
                "USER": "root",
                "%CPU": "0.0",
                "%MEM": "0.0",
                "COMMAND": "watchdog/0",
                "Time": "2022-03-20 00:15:01"
                }
                ],
            dfData:[
                {
                "Filesystem": "/dev/vda1",
                "Available": "45222828",
                "Use": "24%",
                "Time": "2022-03-19 23:48:09\n"
                },
                {
                "Filesystem": "devtmpfs",
                "Available": "877748",
                "Use": "0%",
                "Time": "2022-03-19 23:48:09\n"
                },
                {
                "Filesystem": "tmpfs",
                "Available": "888200",
                "Use": "0%",
                "Time": "2022-03-19 23:48:09\n"
                },
                {
                "Filesystem": "tmpfs",
                "Available": "887544",
                "Use": "1%",
                "Time": "2022-03-19 23:48:09\n"
                },
                {
                "Filesystem": "tmpfs",
                "Available": "888200",
                "Use": "0%",
                "Time": "2022-03-19 23:48:09\n"
                },
                {
                "Filesystem": "overlay",
                "Available": "45222828",
                "Use": "24%",
                "Time": "2022-03-19 23:48:09\n"
                },
                {
                "Filesystem": "overlay",
                "Available": "45222828",
                "Use": "24%",
                "Time": "2022-03-19 23:48:09\n"
                },
                {
                "Filesystem": "overlay",
                "Available": "45222828",
                "Use": "24%",
                "Time": "2022-03-19 23:48:09\n"
                },
                {
                "Filesystem": "tmpfs",
                "Available": "177644",
                "Use": "0%",
                "Time": "2022-03-19 23:48:09"
                }
                ]
        }
    },
    components: {

    },
    mounted() {
        this.drawLine()
        // this.countTestCase()
    },
    created() {
        this.getData();

    },
    methods: {
        drawLine(){
            // 绘制CPU图表
            let cpuChart = echarts.init(this.$refs.cpuChart)
            cpuChart.setOption(
                this.options2
            )
            // 绘制MEM图表
            let memChart = echarts.init(this.$refs.memChart)
            memChart.setOption(
                this.options
            )

            // 绘制net图表
            let netChart = echarts.init(this.$refs.netChart)
            netChart.setOption(
                this.options3
            )

            // 绘制load表
            let loadChart = echarts.init(this.$refs.loadChart)
            loadChart.setOption(
                this.options4
            )
            // window.onresize = loadChart.resize;
            window.addEventListener("resize",function(){
                cpuChart.resize();
                memChart.resize();
                netChart.resize();
                loadChart.resize();
                })

            window.onresize = function (ec) { // 监听窗口大小变化
                console.log(ec)
                loadChart.resize()       // 自适应大小变化
            }  
        },

        getData() {
            cpu().then(res => {
                console.log(res)
                    let usList=[]
                    let syList=[]
                    let freeList=[]
                    let timeList=[]
                    const foo = function(x){
                        usList.push(JSON.parse(x.US))
                        syList.push(JSON.parse(x.SY))
                        freeList.push(JSON.parse(x.Free))
                        timeList.push(x.Time)
                    }
                    res.map(foo)
                    console.log(timeList,9999999)
                    console.log(this.options2.xAxis.data,888888)
                    this.options2.xAxis.data = {0:'21:43:25aa', 1:'21:43:25bb', 2:'21:43:25cc', 3:'21:43:25dd', 4:'21:43:25ee'}
                    this.options2.series[0].data.Target = usList
                    this.options2.series[1].data.Target = syList
                    this.options2.series[2].data.Target = freeList
                    
                }),
            mem().then(res => {
                    console.log(res)
                    // let mem_used=[]
                    // let mem_cache=[]
                    // let mem_buffer=[]
                    // let timeList=[]
                    // const foo = function(x){
                    //     mem_used.push(JSON.parse(x.mem_used))
                    //     mem_cache.push(JSON.parse(x.mem_cache))
                    //     mem_buffer.push(JSON.parse(x.mem_buffer))
                    //     timeList.push(x.Time)
                    // }
                    // res.map(foo)
                    // this.options.labels = timeList
                    // this.options.datasets[0].data = mem_used
                    // this.options.datasets[1].data = mem_cache
                    // this.options.datasets[2].data = mem_buffer
                }),
            load().then(res => {
                console.log(res)
                    // let usList=[]
                    // let syList=[]
                    // let freeList=[]
                    // let timeList=[]
                    // const foo = function(x){
                    //     usList.push(JSON.parse(x.US))
                    //     syList.push(JSON.parse(x.SY))
                    //     freeList.push(JSON.parse(x.Free))
                    //     timeList.push(x.Time)
                    // }
                    // res.map(foo)
                    // this.options3.labels = timeList
                    // this.options3.datasets[0].data = usList
                    // this.options3.datasets[1].data = syList
                    // this.options3.datasets[2].data = freeList
                }),
            df().then(res => {
                console.log(res)
                    // let usList=[]
                    // let syList=[]
                    // let freeList=[]
                    // let timeList=[]
                    // const foo = function(x){
                    //     usList.push(JSON.parse(x.US))
                    //     syList.push(JSON.parse(x.SY))
                    //     freeList.push(JSON.parse(x.Free))
                    //     timeList.push(x.Time)
                    // }
                    // res.map(foo)
                    // this.options3.labels = timeList
                    // this.options3.datasets[0].data = usList
                    // this.options3.datasets[1].data = syList
                    // this.options3.datasets[2].data = freeList
                }),
            net().then(res => {
                console.log(res)
                    // let usList=[]
                    // let syList=[]
                    // let freeList=[]
                    // let timeList=[]
                    // const foo = function(x){
                    //     usList.push(JSON.parse(x.US))
                    //     syList.push(JSON.parse(x.SY))
                    //     freeList.push(JSON.parse(x.Free))
                    //     timeList.push(x.Time)
                    // }
                    // res.map(foo)
                    // this.options3.labels = timeList
                    // this.options3.datasets[0].data = usList
                    // this.options3.datasets[1].data = syList
                    // this.options3.datasets[2].data = freeList
                }),
            top().then(res => {
                console.log(res)
                    // let usList=[]
                    // let syList=[]
                    // let freeList=[]
                    // let timeList=[]
                    // const foo = function(x){
                    //     usList.push(JSON.parse(x.US))
                    //     syList.push(JSON.parse(x.SY))
                    //     freeList.push(JSON.parse(x.Free))
                    //     timeList.push(x.Time)
                    // }
                    // res.map(foo)
                    // this.options3.labels = timeList
                    // this.options3.datasets[0].data = usList
                    // this.options3.datasets[1].data = syList
                    // this.options3.datasets[2].data = freeList
                }),
            countTestCases().then(res => {
                console.log(res)
                this.countcase = res
                console.log(this.countcase)
            }),
            countReports().then(res => {
                console.log(res)
                this.countreport = res
                console.log(this.countreport)
            })
        },
    },
    computed: {
        }
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}

h6 {
    margin-bottom: 5px ;
}
</style>
