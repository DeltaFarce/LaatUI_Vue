<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy"></i> 测试用例
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>

                <el-input v-model="query.name" placeholder="用例名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-add" @click="createCase">创建用例</el-button>
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
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用例名"></el-table-column>

                <el-table-column prop="create_time" label="创建时间"></el-table-column>
                <el-table-column prop="update_time" label="更新时间"></el-table-column>
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


                <el-table-column label="操作" width="280" align="center">
                    <template #default="scope">
                        <el-button
                            type="text"
                            icon="el-icon-lx-punch"
                            @click="handleRun(scope.$index, scope.row)"
                        >运行</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

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
        <el-dialog title="编辑" v-model="editVisible" width="70%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用例名">
                <el-input v-model="form.name" style="width: 370px"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.desc" style="width: 670px"></el-input>
                </el-form-item>
                 <!-- <el-form-item label="用例脚本">
                    <el-input v-model="form.testcase"></el-input>
                </el-form-item> -->
                <div>用例脚本</div>
                <!-- <el-form-item label="用例脚本"></el-form-item> -->
                <v-ace-editor
                v-model:value=form.testcase
                @init="editorInit"
                lang="javascript"
                theme="twilight"
                style="height: 400px" 
                />
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { getProjectToTestcase, createTestCase, deleteTestCase, editTestCase, runCase, searchTestcase, allDelTestcase} from "../api/index";
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
            currentPage: 1,
            content: "",
            orderkey: "id",
        };
    },
    created() {
        this.getData();
    },
    methods: {
        //通过配置options的值配置语法提示
        options:{/*vue2-ace-editor编辑器配置自动补全等*/
                enableBasicAutocompletion: true,
                        enableSnippets: true,
                    enableLiveAutocompletion: true/*自动补全*/
            },

        editorInit() {
                require('brace/mode/javascript')  
                require('brace/theme/twilight')
                require('brace/snippets/javascript') //snippet
                // require('brace/ext/language_tools') //language extension prerequsite...          
                // require("../components/AceEdit/ext-language_tools")
        },

        // 获取全部用例
        getData() {
            getProjectToTestcase(this.query.pageIndex,this.query.pageSize,this.orderkey,this.$store.state.project).then(res => {
                // 将最后一次的测试报告状态放到测试用例state下
                for (let i=0; i<res.results.length; i++){
                    if (res.results[i].case.length != 0){
                        res.results[i]['state']=res.results[i].case[res.results[i].case.length-1].state
                        // console.log(res.results[i].case[res.results[i].case.length-1].state)
                    }else{
                        res.results[i]['state'] = "未检测"
                    }
                }
                
                this.tableData = res.results;
                this.pageTotal = res.pageTotal || res.count;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            searchTestcase(this.query.name).then(res => {
                console.log(res)
                this.tableData = res.results;
                this.pageTotal = res.pageTotal || res.count;
            })
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm("确定要删除吗？", "提示", {
                type: "warning"
            }).then(() => {
                deleteTestCase(row.id)
                this.$message.success("删除成功");
                this.tableData.splice(index, 1);
            }).catch(() => {

            });
        },
        // 多选操作
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val;
            console.log(this.multipleSelection)
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let nameStr = "";
            let idList = [];
            let idStr = "";

            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                nameStr += this.multipleSelection[i].name + ",";
                idList.push(this.multipleSelection[i].id)
                idStr = idList.join(",")
            }
            allDelTestcase(idStr).then(res => {
                this.$message.error(`删除了${nameStr}${res}`);
                this.multipleSelection = [];
                this.getData()
            }, error => {
                this.$message.error(`${error}`);
            })
        },
        // 运行
        handleRun(index, row){
            console.log(row)
            console.log(index)
            const runData={
                "is_delete": row.is_delete,
                "name": row.name,
                "testcase": row.testcase,
                "desc": row.desc,
                "project": row.project
            }
            runCase(row.id, runData)
            this.$message.success(`用例已经开始运行，请稍后查看报告页面！`)
        }
        ,
        // 创建用例
        createCase(){
            this.form.name="",
            this.form.desc="",
            this.form.testcase="",
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
                    "testcase": this.form.testcase,
                    "desc": this.form.desc,
                    "project": this.$store.state.project
                }
                createTestCase(createForm)
                this.$message.success(`新增测试用例成功！`)
                this.getData()
            }else{
                const dataForm={
                    "is_delete": this.form.is_delete,
                    "name": this.form.name,
                    "testcase": this.form.testcase,
                    "desc": this.form.desc,
                    "project": this.form.project
                }
                editTestCase(this.form.id, dataForm)
                this.$message.success(`修改第 ${this.idx + 1} 行成功`)
                this.getData()
            }
            this.editVisible = false;
        },

        // 分页导航
        handlePageChange(val) {
            this.query.pageIndex = val;
            this.currentPage = val;
            this.getData();
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
</style>
