/** @type {Record<string, (elm: HTMLElement) => HTMLElement>} */
const templates = {
    header: () => {
        const headerElm = document.createElement('header');

        return headerElm;
    },
};

export const renderTemplates = () => {
    Object.keys(templates).forEach((id) => {
        const elms = document.querySelectorAll(`[data-template-${id}]`);
        const template = templates[id];
        elms.forEach((elm) => {
            const renderedTemplate = template(elm);
            renderedTemplate.classList.add(id);
            elm.replaceWith(renderedTemplate);
        });
    });
};
