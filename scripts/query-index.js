// Access the query-index data
// TODO do we need to cache the index in a different way? Local storage ?
let index;

export async function getQueryIndex() {
  if(!index) {
    // TODO multiple requests with lower limit?
    const resp = await fetch('/query-index.json?limit=9999');
    if(resp.ok) {
      index = JSON.parse(await resp.text());
    }
  }
  return index;
}

