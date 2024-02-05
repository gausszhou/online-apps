import ePub from 'epubjs';
import { themeList } from './theme';

class EpubEditor {
  book: any;
  rendition: any;
  constructor() {
    const book = ePub('https://static.gausszhou.top/data/book' + location.hash.replace('#', ''));
    const rendition = book.renderTo("content", {
      // 默认双页显示
      width: '100%',
      height: '100%',
      manager: "continuous",
      flow: "scrolled"
    });
    const themes = rendition.themes;
    themeList.forEach((theme) => {
      // 注册全部主题颜色样式
      themes.register(theme.name, theme.style);
    });
    themes.select('gold')

    this.book = book;
    this.rendition = rendition;
    book.ready.then(() => {
      // 生成目录
      const navigation = this.book.navigation;
      this.createToc(navigation);
    })
  }
  show() {
    this.rendition.display();
  }
  createToc(navigation: any) {
    console.log(navigation);
    const list = navigation.toc;
    const html = list.map((item: any) => {
      return `<div class="toc-item" href="${item.href}">${item.label}</div>`
    }).join('');
    const $toc = document.querySelector('#toc') as HTMLDivElement
    if ($toc) {
      $toc.innerHTML = html;
      this.createTocEvent($toc)
    }
    
  }
  createTocEvent(element: HTMLDivElement){
    element.addEventListener('click', (e)=> {
      const item = e.target as HTMLDivElement;
      const href = item.getAttribute('href');
      this.rendition.display(href);
      setTimeout(() => {
        this.rendition.display(href);
      }, 0);
    })
  }
  prevPage() {
    if (this.rendition) {
      this.rendition.prev();
    }
  }
  nextPage() {
    if (this.rendition) {
      this.rendition.next();
    }
  }
}

export function setupEditor() {
  const $editor = new EpubEditor();
  $editor.show();

}
