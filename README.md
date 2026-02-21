# Monero Site Redesign in Astro

This is a implementation of the planned Monero page redesign, built with Astro.

## Features

- **Astro**: Static site generation for no JavaScript, optimal performance and SEO.
- **Internationalization (i18n)**: Dynamically generated multi-language pages with namespace support. Weblate friendly (i18next)
- **Responsive Design**: Modern CSS for a desktop and mobile-friendly experience.
- **Component-Based Architecture**: Reusable Astro components for Hero, Header, Footer, and page sections.

## Project Structure

```
/
├── public/
│   └── media/            # Videos, images
├── src/
│   ├── assets/           # Page assets (icons, artwork, etc.)
│   ├── components/       # Reusable Astro components
│   │   ├── layout/       # Header, Footer
│   │   ├── pages/        # Page-specific components (something that is only used on one page)
│   │   └── ui/           # UI components (buttons, cards, etc.)
│   ├── content/          # Markdown or MDX content files
│   ├── data/             # Static importable data (e.g., download info)
│   ├── i18n/             # Internationalization setup
│   │   ├── locales/      # Translation JSON files
│   │   ├── config.ts     # Locale configuration
│   │   └── utils.ts      # i18n utilities
│   ├── layouts/          # Astro layouts
│   ├── pages/            # Route pages
│   ├── styles/           # Global styles
│   └── utils/            # Utility scripts
├── astro.config.mjs      # Astro configuration
└── package.json
```

## Commands

All commands are run from the root of the project:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm lint`            | Run ESLint to check for code issues              |
| `pnpm lint:css`        | Run Stylelint to check for CSS issues            |
| `pnpm format`          | Format code using Prettier                       |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Docker

You can build and run the site without installing Node.js or pnpm. Three targets are available:

| Target   | Purpose                        | Output                  |
| :------- | :----------------------------- | :---------------------- |
| `dev`    | Local development, live reload | Dev server on `:4321`   |
| `static` | Export static site to host     | `dist/` on your machine |
| `serve`  | Production site via Caddy      | Static server on `:80`  |

### `dev`

```bash
docker build --target dev -t monero-site-dev .
docker run -p 4321:4321 -v $(pwd)/src:/app/src monero-site-dev
```

Then open [http://127.0.0.1:4321](http://127.0.0.1:4321).

### `static`

```bash
docker build --target static --output dist .
```

The built site will be output to the `dist/` directory on your host.

### `serve`

```bash
docker build --target serve -t monero-site .
docker run -p 8080:80 monero-site
```

Then open [http://127.0.0.1:8080](http://127.0.0.1:8080).


## More

- [Astro Documentation](https://docs.astro.build)
- [Monero Project](https://www.getmonero.org)
- [Diego's Figma](https://www.figma.com/design/y53fDBe55sM1GvhxXXjQEp/Monero-Website-Redesign-2024--Copy-?node-id=140-1399&t=TThf0slioIblcNoq-0)
