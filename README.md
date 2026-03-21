# SaCareerPage

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.5.

## Install dependencies

Install project dependencies with:

```bash
npm install --legacy-peer-deps
```

This project uses packages that may require the legacy peer dependency resolution used by npm.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Deploying to Render

This project currently uses Angular's modern application builder with SSR metadata enabled, so browser output is generated as `index.csr.html`.

For static hosting providers (like Render Static Site), `index.html` must exist. Use the provided Render build script:

```bash
npm run build:render
```

That command:
1. Builds production assets.
2. Copies `dist/sa-career-page/browser/index.csr.html` to `dist/sa-career-page/browser/index.html`.

### Static Site on Render (recommended for this app)

Use the settings in [render.yaml](render.yaml):

- Runtime: `static`
- Build command: `npm run build:render`
- Publish directory: `dist/sa-career-page/browser`
- SPA rewrite: `/* -> /index.html`

Important: the publish path must be exactly `dist/sa-career-page/browser`.
If you use `dist/sa-creer-page/browser` (typo), Render returns `Not Found`.

### SSR on Render (Node Web Service)

If you want server-side rendering, use a Node web service instead of static hosting.

Build and start commands:

```bash
npm run build:ssr
npm run start:ssr
```

Expected output folders after SSR build:

- `dist/sa-career-page/browser`
- `dist/sa-career-page/server`

The SSR entrypoint is:

- `dist/sa-career-page/server/server.mjs`

An SSR blueprint is provided in [render.ssr.yaml](render.ssr.yaml).

## Quick Troubleshooting Checklist

If Render shows `Not Found`, check the following:

1. Publish directory is correct: `dist/sa-career-page/browser`.
2. `index.html` exists in publish directory (for static hosting).
3. SPA rewrite is configured: `/* -> /index.html`.
4. You did not accidentally deploy as a static site while using SSR start commands.
5. You did not accidentally deploy as a web service while expecting static hosting.
6. Node version is compatible (`>=20`).
7. Build logs show successful Angular build and output location.

Common mistake patterns:

1. Folder name typo (`career` vs `creer`).
2. Missing rewrite rule, causing route refreshes to 404.
3. Using `npm run build` on this setup for static hosting without generating `index.html`.
