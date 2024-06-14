import './single-post-card.js';

class PostsList extends HTMLElement {
  static template = document.createElement('template');
  static style = `
    posts-list ul {
      display:flex;
      flex-wrap: wrap;
      align-items: top;
      list-style-type:none;
    }
  `;
  static {
    PostsList.template.innerHTML = `<ul></ul>`;
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

  matchAuthor(p) {
    if(!this.author) {
      return true;
    }
    return this.author === p.author;
  }
 
  cleanupImage(data) {
    let result = '';
    try {
      result = JSON.parse(data)[0];
    } catch(ignored) {
    }
    return result;
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
    this.author = this.getAttribute('author');
    const limitAttr = this.getAttribute('limit');

    const n = PostsList.template.content.cloneNode(true);
    const index = await window.devblog.index.get();
    const limit = limitAttr ? Number(limitAttr) : index?.data?.length;
    const ul = n.querySelector('ul');
    index.data?.filter(p => p.date && this.matchTags(p) && this.matchAuthor(p)).slice(0,limit).forEach(entry => {
      const li = document.createElement('li');
      const spc = document.createElement('single-post-card');
      spc.setAttribute('path', entry.path);
      spc.setAttribute('title', entry.title);
      spc.setAttribute('author', entry.author);
      spc.setAttribute('image', this.cleanupImage(entry.image));
      li.append(spc);
      ul.append(li);
    })
    this.append(n);
  }
}

customElements.define('posts-list', PostsList);