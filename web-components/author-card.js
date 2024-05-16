
class AuthorCard extends HTMLElement {
  static template = document.createElement('template');
  static style = `
    author-card img { 
      width:50px;
    }
    author-card { 
      text-align: center;
      font-style: italic;
      font-size: 80%;
    }
  `;
  static {
    AuthorCard.template.innerHTML = `
    <div>
      <img>
      By <a></a>
      on <span></span>
    </div>`;
  }
  static {
    if(document.adoptedStyleSheets) {
      const css = new CSSStyleSheet();
      css.replaceSync(AuthorCard.style);
      document.adoptedStyleSheets.push(css);
    }
  }
  connectedCallback() {
    const id = this.getAttribute('id');
    const name = this.getAttribute('name');
    const n = AuthorCard.template.content.cloneNode(true);

    const a = n.querySelector('a');
    a.textContent = name;
    a.href = `/authors/${id}`;

    n.querySelector('span').textContent = this.getAttribute('date');

    const img = n.querySelector('img')
    img.src = `/images/authors/${id}.png`;
    img.alt = `Image of ${name}, author of this blog post`;
    this.append(n);
  }
}

customElements.define('author-card', AuthorCard);