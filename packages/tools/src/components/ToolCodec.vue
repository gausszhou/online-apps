<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import localforage from 'localforage'
import { onMounted, onUnmounted, ref } from "vue";
import { decodeList, encodeList, hashList, urlList, processCodec } from '../utils/transform';
import { addCommandSave, addContainer, addEditor2List, createEditorContainer, createEditorInstance, createEditorModel, disposeEditorList, setModelLanguage } from './common/editor';
import editorConsole from "./common/editor-console";

const route = useRoute();
const router = useRouter();

const codecType = ref(route.params.type as string);
const encodes = ref(encodeList);
const decodes = ref(decodeList);
const hashs = ref(hashList)
const urls = ref(urlList)

const code1 = `粘贴需要进行转换的字符串`;
const code2 = ``;
const model1 = createEditorModel(code1, "text/plain");
const model2 = createEditorModel(code2, "text/plain");
const $container1 = createEditorContainer();
const $container2 = createEditorContainer();
const editor1 = createEditorInstance($container1, model1);
const editor2 = createEditorInstance($container2, model2, { readOnly: true });

const setModelLanguageByValue = (value: string) => {
  if (value === "urlParamsDecode") {
    setModelLanguage(model1, 'javascript');
    setModelLanguage(model2, 'javascript');
  } else {
    setModelLanguage(model1, 'plain');
    setModelLanguage(model2, 'plain');
  }
}

setModelLanguageByValue(codecType.value);

async function save() {
  const code1 = model1.getValue()
  await localforage.setItem('codec.code1', code1)
  editorConsole.addConsole("\t[INFO]\t" + "Save Success")
}
async function fetch() {
  localforage.getItem('codec.code1').then((value) => {
    model1.setValue(value as string || code1)
  })
}

addCommandSave(editor1, async () => {
  save()
})

onMounted(async () => {
  addEditor2List(editor1);
  addEditor2List(editor2);
  addContainer(document.getElementById("codec-editor") as HTMLElement, $container1);
  addContainer(document.getElementById("codec-editor") as HTMLElement, $container2);
  await fetch();
  excute()
});

onUnmounted(() => {
  disposeEditorList()
});

async function excute() {
  const value1 = editor1.getValue();
  const type = codecType.value;
  try {
    const [value, flag] = await processCodec(value1, type);
    editor2.setValue(value as string);
    if (flag === "unrealized") {
      editorConsole.addConsole("\t[WARN]\t" + "Unrealized");
    }
    if (flag === "success") {
      editorConsole.addConsole("\t[INFO]\t" + "Success");
    }
  } catch (error: any) {
    editor2.setValue("");
    editorConsole.addConsole("\t[Error]\t" + error.message);
  }
}

editor1.onDidChangeModelContent((e) => {
  excute();
});

const onRadioChange = () => {
  excute();
};

const onRadioClick = (value: string) => {
  router.push({
    path: `/codec/${value}`
  })
  codecType.value = value;
  setModelLanguageByValue(codecType.value);
  onRadioChange();
};
</script>

<template>
  <div id="codec">
    <div id="codec-form">
      <div class="g-menu second-level">
        <div class="g-menu-item" tabindex="0" :class="{ 'is-active': option.value === codecType }"
          v-for="option in encodes" :key="option.value" @click="onRadioClick(option.value)">
          <span class="label">{{ option.label }}</span>
        </div>
        <div class="g-divider"></div>
        <div class="g-menu-item" tabindex="0" :class="{ 'is-active': option.value === codecType }"
          v-for="option in decodes" :key="option.value" @click="onRadioClick(option.value)">
          <span class="label">{{ option.label }}</span>
        </div>
        <div class="g-divider"></div>
        <div class="g-menu-item" tabindex="0" :class="{ 'is-active': option.value === codecType }" v-for="option in hashs"
          :key="option.value" @click="onRadioClick(option.value)">
          <span class="label">{{ option.label }}</span>
        </div>
        <div class="g-divider"></div>
        <div class="g-menu-item" tabindex="0" :class="{ 'is-active': option.value === codecType }" v-for="option in urls"
          :key="option.value" @click="onRadioClick(option.value)">
          <span class="label">{{ option.label }}</span>
        </div>
      </div>
    </div>
    <div id="codec-editor"></div>
  </div>
</template>

<style scoped>
#codec {
  width: 100%;
  height: 100%;
  display: flex;
}

#codec-form {
  width: 150px;
  height: 100%;
}

#codec-editor {
  flex: 1;
  height: 100%;
  display: flex;
}

:deep #codec-editor .container {
  flex: 1;
  height: 100%;
}
</style>
