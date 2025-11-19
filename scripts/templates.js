/** @type {Record<string, (elm: HTMLElement) => HTMLElement>} */
const templates = {
    header: () => {
        const headerElm = document.createElement('header');
        headerElm.innerHTML = `<div class="inner">
                <div>
                    <a class="logo" href="/">
                        <img src="/assets/mascot/icon.svg" alt="Pixo" />
                        <span>JSP</span>
                    </a>
                    <form action="/search.html" class="search">
                        <button
                            class="mobile-search-toggle"
                            onclick="this.nextElementSibling.focus()"
                            type="button"
                        >
                            <i data-lucide="search"></i> Search
                        </button>
                        <input
                            type="search"
                            name="q"
                            placeholder="Search for parts"
                            id="search"
                            required
                        />
                        <button type="reset" onclick="this.previousElementSibling.focus()">
                            <i data-lucide="x"></i>
                        </button>
                        <button type="submit">
                            <i data-lucide="search"></i>
                        </button>
                    </form>
                </div>
                <div>
                    <a href="/about.html">About Us</a>
                    <a href="/cart.html" class="cart">
                        <i data-lucide="shopping-cart"></i>
                    </a>
                </div>
            </div>`;
        return headerElm;
    },
};

export function renderTemplates() {
    const nodes = document.querySelectorAll('[data-template]');
    nodes.forEach((node) => {
        const id = node.dataset.template;
        const render = templates[id];
        if (!render) return;

        const rendered = render(node);
        rendered.classList.add(id);
        node.replaceWith(rendered);
    });
}
