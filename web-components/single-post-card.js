import { getAuthorId } from '../scripts/authors.js';

class SinglePostCard extends HTMLElement {
  static template = document.createElement('template');
  static style = `
    single-post-card h2 {
      font-size:100%;
    }
    single-post-card article {
      width: var(--single-post-card-width,50px);
      margin: var(--single-post-card-margin,50px);
    }
    single-post-card div.img {
      min-height: var(--single-post-card-img-height,50px);
    }
    single-post-card :link,
    single-post-card a:visited {
      color:black;
    }
  `;
  static {
    SinglePostCard.template.innerHTML = `<article>
      <div class="img"><img></div>
      <h2><a></a></h2>
      <div class="author"><a></a></div>
    </article>`;
  }
  static {
    if(document.adoptedStyleSheets) {
      const css = new CSSStyleSheet();
      css.replaceSync(SinglePostCard.style);
      document.adoptedStyleSheets.push(css);
    }
  }

  async connectedCallback() {
    const t = SinglePostCard.template.content.cloneNode(true);

    const titleA = t.querySelector('h2 > a');
    titleA.textContent = this.getAttribute('title');
    titleA.href = this.getAttribute('path');

    const authorA = t.querySelector('div[class=author] > a')
    const author = this.getAttribute('author')
    authorA.textContent = author;
    authorA.href = `/authors/${getAuthorId(author)}`;

    t.querySelector('img').setAttribute('src', this.getAttribute('image'));
    this.append(t);
  }
}

customElements.define('single-post-card', SinglePostCard);