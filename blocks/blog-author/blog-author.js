import { getAuthorId } from '../../scripts/authors.js';
let idToName;

export async function getAuthorName(id) {
  if(!idToName) {
    const result = {};
    const index = await window.devblog.index.get();
    index?.data?.forEach(entry => {
      if(entry.author) {
        result[getAuthorId(entry.author)] = entry.author;
      }
    })
    idToName = result;
  }
  const name = idToName[id];
  return name ? name : id;
}

export function getAuthorFromUrl() {
  const path = window.location.pathname;
  const result = path.match(/\/authors\/(.*)$/);
  return result?.[1];
}

export default async function decorate($block) {
  const id = getAuthorFromUrl();
  const name = await getAuthorName(id);
  $block.innerHTML = `<div><h1>${name}</h1><img src='/images/authors/${id}.png'><h2>Posts</h2><ul></ul></div>`;
  const ul = $block.querySelector('ul');
  const index = await window.devblog.index.get();
  index?.data?.forEach(entry => {
    if(entry.author === name) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = entry.path;
      a.textContent = entry.title;
      const span = document.createElement('span');
      span.textContent = ` - ${entry.date}`;
      li.append(a);
      li.append(span);
      ul.append(li);
    }
  })
}