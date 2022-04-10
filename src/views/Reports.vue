<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-global"></i> 测试报告
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button> -->

                <el-input v-model="query.name" placeholder="报告名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data='tableData'
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="报告ID" width="65" align="center"></el-table-column>
                <el-table-column prop="name" label="报告名称"></el-table-column>
                <el-table-column label="状态" width="140" align="center">
                    <template #default="scope">
                        <el-tag
                            :type="
                                scope.row.state === '成功'
                                ? 'success'
                                : scope.row.state === '失败'
                                ? 'danger'
                                : ''
                            "
                        >{{ scope.row.state }}</el-tag>
                    </template>
                    <!-- <el-tag>成功</el-tag> -->
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间"  width="265"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >查看</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 翻页器 -->
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    :hide-on-single-page="value"
                    v-model:currentPage="currentPage"
                    @current-change="handlePageChange"
                ></el-pagination>

            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="查看报告" v-model="editVisible" width="70%">
            <el-tabs v-model="activeName" @tab-click="handleClick" :model="form">
                <el-tab-pane label="运行日志" name="first">
                    <el-card class="box-card">
                        <v-ace-editor
                        v-model:value=form.log
                        @init="editorInit"
                        lang="javascript"
                        theme="twilight"
                        style="height:500px"
                        showPrintMargin=false
                        />
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="失败截图" name="second" style="height:500px">
                    <img :src=form.screenshot style="height:500px" onerror="onerror=null;src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F19%2F03%2F07%2F77ecc854d080f1dca4d92c9abb4e8fdf.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650695913&t=cbf41a3dc722e8524b10f884e84f80ca'">
                </el-tab-pane>
                <el-tab-pane label="运行视频" name="third">
                    <video :src=form.video controls="controls"  style="height:500px">
                        your browser does not support the video tag
                    </video>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import { getReports, createProject, deleteProject, editProject, searchReports} from "../api/index";

import { VAceEditor } from 'vue3-ace-editor';
export default {
    name: "basetable",
    components: {
        VAceEditor
    },
    data() {
        return {
            query: {
                address: "",
                name: "",
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            activeName: 'first',
            currentPage: 1,
            content: "",
            orderkey: "-id",
        };
    },
    created() {
        this.getData();
        
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },

        // 触发搜索按钮
        handleSearch() {
            searchReports(this.query.name).then(res => {
                console.log(res)
                this.tableData = res.results;
                this.pageTotal = res.pageTotal || res.count;
            })
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection)
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = "";
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + " ";
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 获取全部报告
        getData() {
            getReports(this.query.pageIndex,this.query.pageSize,this.orderkey,this.$store.state.project).then(res => {
                // console.log(res)
                this.tableData = res.results;
                this.pageTotal = res.pageTotal || res.count;
            });
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm("确定要删除吗？", "提示", {
                type: "warning"
            })
                .then(() => {
                    deleteProject(row.id)
                    this.$message.success("删除成功");
                    this.tableData.splice(index, 1);
                })
                .catch(() => {
                    
                });
        },
        // 创建用例
        addProject(){
            this.editVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            if (this.form.id == undefined){
                const createForm={
                    "name": this.form.name,
                    "desc": this.form.desc,
                }
                createProject(createForm)
                this.$message.success(`新增项目成功！`)
            }else{
                const dataForm={
                    "is_delete": this.form.is_delete,
                    "name": this.form.name,
                    "desc": this.form.desc,
                }
                editProject(this.form.id, dataForm)
                this.$message.success(`修改第 ${this.idx + 1} 行成功`)
            }
            this.editVisible = false;
        },
        // 分页导航
        handlePageChange(val) {
            this.query.pageIndex = val;
            this.currentPage = val;
            this.getData();
        },

        editorInit() {
        require('brace/mode/javascript')  
        require('brace/theme/twilight')
        require('brace/snippets/javascript') //snippet
        // require('brace/ext/language_tools') //language extension prerequsite...  
        },

    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.text {
font-size: 14px;
}

.item {
padding: 18px 0;
}

.box-card {
height: 550px;
overflow-y:scroll;
}
</style>