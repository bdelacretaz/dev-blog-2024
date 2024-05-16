// Blog-specific scripts
import {
  buildBlock,
} from './aem.js';

function buildTagsBlock(main) {
  const tagsArray = [...document.head.querySelectorAll('meta[property="article:tag"]')].map((el) => el.content) || [];
  const tagsBlock = buildBlock('tags', tagsArray.join(', '));
  main.lastElementChild.append(tagsBlock);
}

export async function buildBlogBlocks(main) {
  buildTagsBlock(main);
}
