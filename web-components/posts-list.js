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

  // If any of the posts's tags matches one of our tags, accept the post
  matchTags(post) {
    if(!this.tags) {
      return true;
    }
    return this.tags.filter(v => post.tags.includes(v)).length > 0;
  }

  async connectedCallback() {
    const title = this.getAttribute('title');
    if(title) {
      const h = document.createElement('h3');
      h.textContent = title;
      this.append(h);
    }

    const t = this.getAttribute('tags');
    this.tags = t ? t.toLowerCase().split(',') : null;
    const limitAttr = this.getAttribute('limit');

    const n = PostsList.template.content.cloneNode(true);
    const index = await window.devblog.index.get();
    const limit = limitAttr ? Number(limitAttr) : index?.data?.length;
    const ul = n.querySelector('ol');
    index.data?.filter(p => p.date && this.matchTags(p)).slice(0,limit).forEach(entry => {
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