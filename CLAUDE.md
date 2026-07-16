# Pokedex - Vite + React SPA

## Setup & Development

**Stack**: Vite + React (JavaScript), no backend

**Data source**: [pokeapi.co](https://pokeapi.co)

**Deployment**: GitHub Pages at `/<repo-name>/`

### Local Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Build for production
```

### Build & Deploy

- CI/CD runs on push to main and on pull requests
- `npm run build` must pass from a clean checkout
- Artifacts deployed to GitHub Pages
- Live page must render content with no console errors

## Development Rules

- All changes after initial setup: branch + pull request
- Use GitHub MCP tools for all GitHub work (runs, logs, PRs) — not curl
