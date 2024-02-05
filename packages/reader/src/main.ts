import './style.css'
import { setupEditor } from './editor/index.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="page">
    <div id="toc"></div>
    <div id="content"></div>
  </div>
`
setupEditor()
