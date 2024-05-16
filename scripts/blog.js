// Blog-specific scripts
import {
  buildBlock,
  getMetadata
} from './aem.js';

// Map some names from the original content
// to get the correct image filenames
const authorNamesMap = {
  "Zuri Klaschka (they/them)" : "Zuri Klaschka",
  "Bianca Costache (Teşilă)" : "Bianca Costache"
};

function loadWebComponents() {
  // List all components here that are found
  // in our web-components folder. This function
  // loads those which are found in the document.
  [
    'author-card'
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

// Must be consistent with the mapping from
// names to image filenames used when importing
function getAuthorId(name) {
  const mapped = authorNamesMap[name];
  const n = mapped ? mapped : name;
  return n.toLowerCase().replace(/[^a-zA-Z0-9]/g,'-');
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

export async function buildBlogBlocks(main) {
  buildTagsBlock(main);
  buildAuthorCardBlock(main);
  loadWebComponents();
}
