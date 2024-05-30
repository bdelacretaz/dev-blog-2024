class PostsList extends HTMLElement {
  static template = document.createElement('template');
  static style = `
  `;
  static {
    PostsList.template.innerHTML = `<ol></ol>`;
  }
  static {
    if(document.adoptedStyleSheets) {
      const css = new CSSStyleSheet();
      css.replaceSync(PostsList.style);
      document.adoptedStyleSheets.push(css);
    }
  }

  async connectedCallback() {
    const n = PostsList.template.content.cloneNode(true);
    const index = await window.devblog.index.get();
    const ul = n.querySelector('ol');
    index.data?.filter(e => e.date).forEach(entry => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = entry.path;
      a.textContent = entry.title;
      li.append(a);
      const span = document.createElement('span');
      span.textContent = ` - ${entry.author}`;
      li.append(span);
      ul.append(li);
    })
    this.append(n);
  }
}

customElements.define('posts-list', PostsList);