<template>
  <div id="format">
    <div id="format-form">
      <div class="g-menu second-level">
        <div class="g-menu-item" tabindex="0" :class="{ 'is-active': option.value === language }"
          v-for="option in languages" :key="option.value" @click="onRadioClick(option.value)">
          <span class="label">{{ option.label }}</span>
        </div>
      </div>
    </div>
    <div id="format-editor"></div>
  </div>
</template>

<script setup lang="ts">
import localforage from 'localforage';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toolList, processContent } from '../utils/transform';
import {
  addCommandSave,
  addContainer,
  addEditor2List,
  createEditorContainer, 
  createEditorInstance, 
  createEditorModel, 
  disposeEditorList, 
  setModelLanguage
} from '../editor/editor';
import editorConsoleInstance from '../editor/console';

const route = useRoute();
const router = useRouter();

const language = ref(route.params.language as string);
const languages = ref(toolList);

const code1 = `// 粘贴需要进行格式化的代码
function main() { console.log("Hello World!"); }
`;
const code2 = ``;
const model1 = createEditorModel(code1, "javascript");
const model2 = createEditorModel(code2, "javascript");
const $container1 = createEditorContainer();
const $container2 = createEditorContainer();
const editor1 = createEditorInstance($container1, model1);
const editor2 = createEditorInstance($container2, model2, { readOnly: true });

async function save() {
  const code1 = model1.getValue();
  await localforage.setItem(`format.${language.value}`, code1)
  editorConsoleInstance.addConsole("\t[INFO]\t" + "Save Success")
}

async function fetch() {
  await localforage.getItem(`format.${language.value}`).then((value) => {
    model1.setValue(value as string || code1)
  })
  editorConsoleInstance.addConsole("\t[INFO]\t" + "Fetch Success")
}

addCommandSave(editor1, async () => {
  save()
})

onMounted(async () => {
  addEditor2List(editor1);
  addEditor2List(editor2);
  addContainer(document.getElementById("format-editor") as HTMLElement, $container1);
  addContainer(document.getElementById("format-editor") as HTMLElement, $container2);
  await fetch()
  excute()
});

onUnmounted(() => {
  disposeEditorList()
});

async function excute() {
  const value1 = editor1.getValue();
  const type = language.value;
  try {
    const [value, flag] = await processContent(value1, type);
    editor2.setValue(value as string);
    if (flag === "unrealized") {
      editorConsoleInstance.addConsole("\t[WARN]\t" + "Format Unrealized");
    }
    if (flag === "success") {
      editorConsoleInstance.addConsole("\t[INFO]\t" + "Format Success");
    }
  } catch (error: any) {
    editor2.setValue("");
    editorConsoleInstance.addConsole("\t[Error]\t" + error.message);
  }
}

editor1.onDidChangeModelContent((e) => {
  excute();
});

const onRadioClick = async (value: string) => {
  router.push({
    path: `/${value}`
  })
  language.value = value;
  setModelLanguage(model1, value)
  setModelLanguage(model2, value)
  await fetch()
  excute();
};
</script>


<style scoped>
#format {
  width: 100%;
  height: 100%;
  display: flex;
}

#format-form {
  width: 150px;
  height: 100%;
}

#format-editor {
  flex: 1;
  height: 100%;
  display: flex;
}

:deep(#format-editor .container) {
  flex: 1;
  height: 100%;
}
</style>
../editor/console