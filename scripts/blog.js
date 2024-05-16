// Blog-specific scripts
import { getAuthorId } from './authors.js';
import {
  buildBlock,
  getMetadata
} from './aem.js';

function loadWebComponents() {
  // List all components here that are found
  // in our web-components folder. This function
  // loads those which are found in the document.
  [
    'author-card',
    'tag-page'
  ].forEach(name => {
    if(document.querySelector(name)) {
      const script = document.createElement('script');
      script.setAttribute('src', `/web-components/${name}.js`);
      script.setAttribute('type', 'module');
      document.head.append(script);
    }
  })
}

function buildTagsBlock(main) {
  const tagsArray = [...document.head.querySelectorAll('meta[property="article:tag"]')].map((el) => el.content) || [];
  const tagsBlock = buildBlock('tags', tagsArray.join(', '));
  main.lastElementChild.append(tagsBlock);
}

function buildAuthorCardBlock(main) {
  const title = main.querySelector('h1');
  const author = getMetadata('author');
  if(title && author) {
    const c = document.createElement('author-card');
    c.setAttribute('name', author);
    c.setAttribute('id', getAuthorId(author));
    c.setAttribute('date', getMetadata('m_date'));
    title.parentNode.insertBefore(c, title.nextSibling);
  }
}

function getTagFromUrl() {
  const path = window.location.pathname;
  const result = path.match(/\/tags\/(.*)$/);
  return result?.[1];
}

function buildTagsPage(main) {
  const c = document.createElement('tag-page');
  c.setAttribute('tag', getTagFromUrl());
  main.append(c);
}

export async function buildBlogBlocks(main) {
  if(window.location.pathname.match(/^\/tags\//)) {
    buildTagsPage(main);
  } else {
    buildTagsBlock(main);
    buildAuthorCardBlock(main);
  }
  loadWebComponents();
}
