<template>
  <div class="codeEditBox">
    <v-ace-editor
    v-model:value="content"
    @init="editorInit"
    lang="javascript"
    theme="twilight"
    style="height: 300px" 
    />
  </div>
</template>
<script>
import { VAceEditor } from 'vue3-ace-editor';
export default {
  components: {
    VAceEditor,
  },
  data() {
    return {
      content: ""
    };
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
       }

  },
};
</script>

<style scoped>

</style>
