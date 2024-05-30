import '../../web-components/posts-list.js';
import { getBlockData } from '../../scripts/blog.js';

export default async function decorate(block) {
  const data = getBlockData(block);
  const pl = document.createElement('posts-list');
  if(data.tags) {
    pl.setAttribute('tags', data.tags);
  }
  if(data.limit) {
    pl.setAttribute('limit', data.limit);
  }
  block.replaceChildren(pl);
}