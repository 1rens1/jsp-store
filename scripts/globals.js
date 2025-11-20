import { categoryTags, products } from './products.js';
import { renderSimpleIcons, renderTemplates } from './templates.js';

renderTemplates();
renderSimpleIcons();
lucide.createIcons({
    attrs: {
        width: '1em',
        height: '1em',
    },
});

const updateAtTop = () => {
    const atTop = window.scrollY === 0;
    document.body.dataset.atTop = atTop;
};

updateAtTop();
window.addEventListener('scroll', updateAtTop);

const debug = document.createElement('pre');
debug.innerText = JSON.stringify(categoryTags, null, 4);
// document.body.appendChild(debug);
