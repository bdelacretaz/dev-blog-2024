const authors = {
  testing: {
    name: 'The Tester Here',
    image: 'https://pps.services.adobe.com/api/profile/C4D657EB5489E6740A4C98A5@adobe.com/image/f61258b6-431e-46be-ba47-0f57e30b890d/138'
  },
  lars: {
    name: 'Lars T',
    image: 'https://miro.medium.com/v2/resize:fit:240/1*NTpbPcZC-g1hVTtp7B-alQ.jpeg'
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
  if(!author) {
    $block.innerHTML = `Author not found: ${id}`;
  } else {
    $block.innerHTML = `<div><h1>${author.name}</h1><img src='${author.image}'></div>`;
  }
}