<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">LaatUI</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 项目选择框 -->
                    <el-select v-model="value" class="projectSelect"  placeholder="请选择项目" size="large" style="padding:5px" @change='handleChange'>
                    <el-option
                    v-for="item in options"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                    />
                    </el-select>
                <div class="user-avator">
                    <img src="../assets/img/img.jpg" />
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import {getProject} from "../api/index"
export default {
    data() {
        return {
            fullscreen: false,
            options: [],
            value: '',
        };
    },
    computed: {
        collapse() {
            return this.$store.state.collapse;
        }
    },
    methods: {
        // 侧边栏折叠
        collapseChage() {
            this.$store.commit("hadndleCollapse", !this.collapse);
        },
        handleChange(val){
            localStorage.setItem("value",val);
            console.log(this.value)
            this.$store.state.project = val
            console.log(val)
        },
        getData (){
            getProject().then( res => {
                this.options = res.results
                console.log(localStorage.getItem("value"))
                this.value = this.options[localStorage.getItem("value")-1].name
                this.$store.state.project = localStorage.getItem("value")
            }).catch( error => {
                console.log(error)
            })
        }
    },
    mounted() {
        // if (document.body.clientWidth < 1500) {
        //     this.collapseChage();
        // }

        this.getData()

        },

};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
