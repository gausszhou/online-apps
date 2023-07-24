
<script lang="ts" setup>
import localforage from 'localforage'
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { languageList } from '../utils/transform';
import { addCommandSave, addContainer, addEditor2List, createEditorContainer, createEditorDiff, createEditorModel, disposeEditorList, setModelLanguage } from './common/editor';
import editorConsole from './common/editor-console';

const route = useRoute();
const router = useRouter();

const language = ref(route.params.language);
const languages = ref(languageList);

const code1 = `// 这里是注释
function main() { 
   console.log("Hello world!");
}`;
const code2 = `// 这里是注释
function main() { 
   console.log("Hello World!");
}`;

const originalModel = createEditorModel(code1, "javascript");
const modifiedModel = createEditorModel(code2, "javascript");
const $container = createEditorContainer();
const editorDiff = createEditorDiff($container);
editorDiff.setModel({
  original: originalModel,
  modified: modifiedModel,
});

async function save() {
  const code1 = originalModel.getValue()
  const code2 = modifiedModel.getValue()
  await localforage.setItem(`diff.code1.${language.value}`, code1)
  await localforage.setItem(`diff.code2.${language.value}`, code2)
  editorConsole.addConsole("\t[INFO]\t" + "Save Success")
}

async function fetch() {
  console.log(`diff-code1.${language.value}`)
  await localforage.getItem(`diff.code1.${language.value}`).then((value) => {
    originalModel.setValue(value as string || code1)
  })
  await localforage.getItem(`diff.code2.${language.value}`).then((value) => {
    modifiedModel.setValue(value as string || code2)
  })
  editorConsole.addConsole("\t[INFO]\t" + "Fetch Success")
}

addCommandSave(editorDiff, async () => {
  save()
})

onMounted(() => {
  addEditor2List(editorDiff);
  addContainer(document.getElementById("diff-editor") as HTMLElement, $container);
  fetch()
});

onUnmounted(() => {
  disposeEditorList()
});

const onRadioClick = async (value: string) => {
  router.push({
    path:`/diff/${value}`
  })
  language.value = value;
  setModelLanguage(originalModel, value)
  setModelLanguage(modifiedModel, value)
  await fetch()

}
</script>

<template>
  <div id="diff">
    <div id="diff-form">
      <div class="g-menu second-level">
        <div class="g-menu-item" tabindex="0" :class="{ 'is-active': option.value === language }"
          v-for="option in languages" :key="option.value" @click="onRadioClick(option.value)">
          <span class="label">{{ option.label }}</span>
        </div>
      </div>
    </div>
    <div id="diff-editor"></div>
  </div>
</template>

<style scoped>
#diff {
  width: 100%;
  height: 100%;
  display: flex;
}

#diff-form {
  width: 150px;
}

#diff-editor {
  flex: 1;
  height: 100vh;
}

:deep #diff-editor .container {
  flex: 1;
  height: 100%;
}
</style>