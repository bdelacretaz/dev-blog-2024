// Access the query-index data
// TODO cache the index, or store in local storage ??
let index;

export async function getQueryIndex() {
  if(!index) {
    const resp = await fetch('/query-index.json');
    if(resp.ok) {
      index = JSON.parse(await resp.text());
    }
  }
  return index;
}

