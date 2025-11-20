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
    footer: () => {
        const footerElm = document.createElement('footer');
        footerElm.innerHTML = `<div class="inner">
                <div class="footer-main">
                    <div class="links">
                        <div>
                            <a class="logo" href="/">
                                <img src="/assets/mascot/icon.svg" alt="Pixo" />
                                <span>JSP</span>
                            </a>
                        </div>
                        <section>
                            <div>COMPANY</div>
                            <ul>
                                <li><a href="/about.html">About Us</a></li>
                                <li><a href="/tos.html">Terms of Service</a></li>
                                <li><a href="/pp.html">Privacy Policy</a></li>
                            </ul>
                        </section>
                        <section>
                            <div>CREDIT</div>
                            <ul>
                                <li><a href="javascript:eval('\u0061\u006C\u0065\u0072\u0074\u0028\u0027\u003A\u0050\u0027\u0029')">&#82;&#101;&#105;&#110;</a></li>
                                <li><a href="javascript:eval('\u0061\u006C\u0065\u0072\u0074\u0028\u0027\u003A\u0050\u0027\u0029')">&#74;&#111;&#97;&#110;&#110;&#97;</a></li>
                                <li><a href="https://lucide.dev/">Lucide Icons</a></li>
                                <li><a href="https://simpleicons.org/">Simple Icons</a></li>
                            </ul>
                        </section>
                    </div>

                    <section class="socials">
                        <ul>
                            <li>
                                <a href="javascript:void(0);"><i data-si="instagram"></i></a>
                            </li>
                            <li>
                                <a href="javascript:void(0);"><i data-si="facebook"></i></a>
                            </li>
                            <li>
                                <a href="javascript:void(0);"><i data-si="discord"></i></a>
                            </li>
                            <li>
                                <a href="javascript:void(0);"><i data-si="x"></i></a>
                            </li>
                        </ul>
                    </section>
                </div>
                <div class="copyright">&copy; <span class="brand">JSP Store</span> 2025</div>
            </div>`;
        return footerElm;
    },
};

export const renderTemplates = () => {
    const nodes = document.querySelectorAll('[data-template]');
    nodes.forEach((node) => {
        const id = node.dataset.template;
        const render = templates[id];
        if (!render) return;

        const rendered = render(node);
        rendered.classList.add(id);
        node.replaceWith(rendered);
    });
};

export const renderSimpleIcons = async () => {
    const iconTemplates = document.querySelectorAll('i[data-si]');
    if (!iconTemplates.length) return;

    const parser = new DOMParser();

    const slugs = [
        // Prevent duplicate
        ...new Set(
            /** @type {string[]} */
            Array.from(iconTemplates, (el) => el.dataset.si).filter(Boolean)
        ),
    ];

    // Fetch all SVGs in parallel
    const results = await Promise.all(
        slugs.map(async (slug) => {
            const res = await fetch(`https://unpkg.com/simple-icons@v15/icons/${slug}.svg`);
            return [slug, await res.text()];
        })
    );

    // Map for quick lookup
    const cache = new Map(results);

    // Replace each icon
    for (const iconTemplate of iconTemplates) {
        const slug = iconTemplate.dataset.si;
        if (!slug) continue;

        const svgText = cache.get(slug);
        if (!svgText) continue;

        const svg = parser.parseFromString(svgText, 'image/svg+xml').querySelector('svg');
        if (!svg) continue;

        const attrs = {
            width: '1em',
            height: '1em',
            fill: 'currentColor',
            'stroke-color': 'currentColor',
        };
        Object.keys(attrs).forEach((key) => svg.setAttribute(key, attrs[key]));

        iconTemplate.replaceWith(svg);
    }
};
