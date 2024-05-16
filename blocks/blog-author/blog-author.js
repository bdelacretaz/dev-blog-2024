const authors = {
  'bertrand-delacretaz': {
    name: 'Bertrand Delacretaz',
  },
  'lars-trieloff': {
    name: 'Lars Trieloff'
  }
}

export function getAuthorFromUrl() {
  const path = window.location.pathname;
  const result = path.match(/\/authors\/(.*)$/);
  return result?.[1];
}

export default async function decorate($block) {
  const id = getAuthorFromUrl();
  const author = authors[id];
  $block.innerHTML = `<div><h1>${author ? author.name : `${id}`}</h1><img src='/images/authors/${id}.png'></div>`;
}