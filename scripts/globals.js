import { renderTemplates } from './templates.js';

renderTemplates();
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
