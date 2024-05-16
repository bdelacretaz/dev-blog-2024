export default async function decorate(block) {
  const ul = document.createElement('ul');
  const tags = block.textContent.trim();
  tags.split(',').forEach(tag => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', `/tags/${tag}`);
    a.textContent = tag;
    li.append(a);
    ul.append(li);
  });
  block.replaceChildren(ul);
}