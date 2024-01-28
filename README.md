# vue-users-app

This is a Users CRUD application developed with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

## Prererequisites
To have Node.js and npm installed. Install the Vite CLI:

```sh
npm install -g create-vite
```

## Project Setup

Navigate to the root folder of this project and install dependecies:

```sh
npm install
```

### Start Development Server

```sh
npm run serve
```

### Build for Production

```sh
npm run build
```

### Run Cypress E2E Tests in Browser

```sh
npm run e2e:browser
```

### Run Cypress E2E Tests in CLI

```sh
npm run e2e:headless
```
