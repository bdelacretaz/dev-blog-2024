import '../../web-components/posts-list.js';

export default async function decorate(block) {
  block.innerHTML = '<posts-list></posts-list>';
}