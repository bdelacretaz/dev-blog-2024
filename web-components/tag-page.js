class TagPage extends HTMLElement {
  static template = document.createElement('template');
  static style = `
    header tag-page,
    footer tag-page {
      display:none;
    }
  `;
  static {
    TagPage.template.innerHTML = `
    <div>
      <h2>Tag: <span></span></h2>
      <ul>
      </ul>
    </div>`;
  }
  static {
    if(document.adoptedStyleSheets) {
      const css = new CSSStyleSheet();
      css.replaceSync(TagPage.style);
      document.adoptedStyleSheets.push(css);
    }
  }

  constructor() {
    super();
    this.tag = this.getAttribute('tag');
  }

  async connectedCallback() {
    const n = TagPage.template.content.cloneNode(true);
    n.querySelector('h2 span').textContent = this.tag;

    const ul = n.querySelector('ul');
    const index = await window.devblog?.index.get();
    index?.data?.forEach(entry => {
      const tags = JSON.parse(entry.tags);
      if(tags.includes(this.tag)) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('href', entry.path);
        a.textContent = entry.title;
        li.append(a);
        ul.append(li);
      }
    })

    this.append(n);
  }
}

customElements.define('tag-page', TagPage);