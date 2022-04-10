<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-global"></i> 项目列表
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

                <el-input v-model="query.name" placeholder="项目名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-add" @click="addProject">创建项目</el-button>
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
                <el-table-column prop="name" label="项目名称"></el-table-column>
                <el-table-column prop="desc" label="项目描述"></el-table-column>
                <el-table-column prop="create_time" label="创建时间"></el-table-column>
                <el-table-column prop="update_time" label="更新时间"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
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
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="70%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="项目名称">
                <el-input v-model="form.name" style="width: 370px"></el-input>
                </el-form-item>
                <el-form-item label="项目描述">
                    <el-input v-model="form.desc" style="width: 670px"></el-input>
                </el-form-item>
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
import { getProject, createProject, deleteProject, editProject, searchProjects} from "../api/index";
export default {
    name: "basetable",
    components: {

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
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            searchProjects(this.query.name).then(res => {
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
        // 获取全部用例
        getData() {
            getProject().then(res => {
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
                this.getData();
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
            this.$set(this.query, "pageIndex", val);
        }
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