<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="项目设置" name="first">
        <div class="radio" label="运行方式">
          <span style="font-zise: 26px;margin: 50px 13px 50px 0px;font-weight:bold;">运行方式</span>
          <el-radio v-model="radio" label="1" size="large">并行</el-radio>
          <el-radio v-model="radio" label="2" size="large">串行</el-radio>
        </div>
        
        <div class="click">
          <span style="font-zise: 16px;margin-right: 13px;font-weight:bold;">是否开启定时运行</span>
          <el-switch v-model="value1" />
        </div>
        <div>
          <span style="font-zise: 16px;margin: 13px;">日期选择</span>
          <el-checkbox v-model="checked1" label="星期一" size="large" />
          <el-checkbox v-model="checked2" label="星期二" size="large" />
          <el-checkbox v-model="checked3" label="星期三" size="large" />
          <el-checkbox v-model="checked4" label="星期四" size="large" />
          <el-checkbox v-model="checked5" label="星期五" size="large" />
          <el-checkbox v-model="checked6" label="星期六" size="large" />
          <el-checkbox v-model="checked7" label="星期日" size="large" />
        </div>
        <div class="click">
          <span style="font-zise: 16px;margin: 13px;">触发方式</span>
          <el-select v-model="value" class="m-2" placeholder="Select" size="large">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="click">
          <span style="font-zise: 16px;margin: 13px;">周期设定</span>
            <div class="example-basic">
              <el-time-picker v-model="value1" placeholder="Arbitrary time" />
              <el-time-picker
                v-model="value2"
                arrow-control
                placeholder="Arbitrary time"
              />
            </div>
        </div>

        <div class="host">
            <span style="font-zise: 16px;font-weight:bold;">Host配置</span>
            <div style="margin-top: 10px;">
              <el-input
                v-model="textarea"
                :rows="2"
                type="textarea"
                placeholder="请输入host"
              />
            </div>
        </div>

        <div class="http">
            <span style="font-zise: 16px;margin-right: 13px;font-weight:bold;">HTTP代理</span>
            <div style="margin-top: 10px;">
              <el-input
                v-model="textarea"
                :rows="2"
                type="textarea"
                placeholder="请输入host"
              />
            </div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="告警设置" name="second">
        <span style="font-zise: 16px;font-weight:bold;">钉钉Hook</span>
        <el-input v-model="input" placeholder="请输入钉钉Hook" style="margin-top: 10px;"/>
        <div class="http">
            <span style="font-zise: 16px;margin-right: 13px;font-weight:bold;">邮箱地址</span>
            <div style="margin-top: 10px;">
              <el-input
                v-model="textarea"
                :rows="2"
                type="textarea"
                placeholder="请输入邮箱地址"
              />
            </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="运行设置" name="third">
       <div style="margin-top: 16px">
          <span style="font-zise: 16px;margin-top: 33px;font-weight:bold;">失败重试</span>
          <div style="margin-top: 10px;width:300px">
            <el-input
             placeholder="3"
            />
          </div>
        </div>
       <div style="margin-top: 16px">
          <span style="font-zise: 16px;margin-top: 33px;font-weight:bold;">页面加载超时</span>
          <div style="margin-top: 10px;width:300px">
            <el-input
             placeholder="6000"
            />
          </div>
        </div>
       <div style="margin-top: 16px">
          <span style="font-zise: 16px;margin-top: 33px;font-weight:bold;">控件查找超时</span>
          <div style="margin-top: 10px;width:300px">
            <el-input
             placeholder="3000"
            />
          </div>
        </div>
        <div style="margin-top: 16px">
          <span style="font-zise: 16px;margin-top: 33px;font-weight:bold;">并发数</span>
          <div style="margin-top: 10px;width:300px">
            <el-input
             placeholder="5"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ref } from 'vue'


export default {
  data(){
    return {
      activeName : ref('first'),
      radio : ref('1'),
      value1 : ref(true),
      checked1 : true,
      options : [  { value: 'Option1', label: '单周期' },{ value: 'Option2', label: '周期触发' }]
    }
  },
  methods:{
    handleClick (tab, event){
      console.log(tab, event)
    }
  },

}
</script>

<style>
  .radio{
    margin: 20px 13px 35px 0px;
  }

  .click {
    margin: 15px 13px 15px 0px;
  }

  .example-basic {
    display: inline;
    
  }

  .host{
    margin: 20px 13px 35px 0px;
  }
  
  .http{
    margin: 20px 13px 35px 0px;
  }

  .inline {
    display: inline;
  }
  
</style>