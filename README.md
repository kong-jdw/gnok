# JDW Kong frontend test

## Notes

## Minor issues

- There is an extraneous comma in `tsconfig.json` on [line 27](https://github.com/Kong/konnect-team-interview-frontend-exercise/blob/main/tsconfig.json#L27)
- The readme says "[Don't treat the mock as gospel"](https://github.com/Kong/konnect-team-interview-frontend-exercise/blob/main/README.md?plain=1#L12) but then says "[Pixel-perfect implementation](https://github.com/Kong/konnect-team-interview-frontend-exercise/blob/main/README.md?plain=1#L33)" which is a bit contradictory.

## A yarn about pnpm, vim, and ale, oh my

I mentioned to A.G. and R.F. that I had issues with pnpm a few years ago... I was wrong! I made an offhand comment to them about how it was weird pnpm requires you to commit dependencies to your repo and I got a strange look from R.F. (fair). Turns out I wasn't remembering pnpm, I was remembering Yarn's plug'n'play setup which DOES recommend you commit dependencies which is a whole... choice. I figured this out because my normal editing environment (Vim) has a plugin which runs linters (Ale) and it doesn't handle the way pnpm installs dependencies correctly. As I was researching the issue, I ran into [a comment I made two years ago](https://github.com/dense-analysis/ale/issues/2970#issuecomment-815300052) and well, that jogged my memory.

In any case, the issue with Ale is that it tries to run the eslint executable directly from the `node_modules` folder and that errors out with `The package "eslint-plugin-promise" was not found` (you can reproduce this yourself by trying to run `node_modules/.pnpm/eslint@9.11.1_jiti@1.21.0/node_modules/eslint/bin/eslint.js src/App.vue`, though if you have eslint-plugin-promise globally installed it won't error probably). The simplest solution was to just add the following to my Vim configuration:

```
let g:ale_javascript_eslint_use_global = 1
let g:ale_javascript_eslint_executable = 'pnpm'
let g:ale_javascript_eslint_options = 'lint'
```

Which... I didn't want to do globally as my personal projects all use npm and don't have this issue, so that's why `.lvimrc` ([local vimrc](https://github.com/embear/vim-localvimrc)) got added to `.gitignore`.

---

# Welcome

Please take the time to read through all of the sections below; we want you to do great! :rocket:

Feel free to reach out to your recruiting contact with any questions or concerns.

## Goal

Modify the provided Vue 3 app to match [this mock](https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project) as closely as possible while utilizing best-practices to improve the codebase and implement the functional requirements outlined below.

- The provided exercise files are a starting point and they have room for improvement; feel free to modify
- Don't treat the mock as gospel -- if you see things that don't make sense, ask questions or implement what you think is right
- In the exercise you are utilizing a local API; however, code your submission as if you are using a production API, accounting for typical issues that can occur

### Links

- Figma Mock: <https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project>
- Acceptance criteria: <https://docs.google.com/document/d/1AIXTtrEMZBnfoLYXDlBYiEB-BTk7XNt2QlY7jWYdPv0/edit?tab=t.0#heading=h.8hapmwf98sj>

## Functional Requirements

- [Vue 3](https://vuejs.org/) and TypeScript
- User should be able to view the name, a brief description, versions available, and other info shown in the mock for services
- User should be able to search for services ([See search endpoint details below](#searching-the-services-endpoint))
- User should be able to click on a service to view more details
- User should be able to paginate through services (client-side implementation)
- The create Service Package button doesn't have to be operable -- interacting with this elements could do nothing, could be fully implemented (stretch goal), or something in between
- Please update the `README` in the project with a section to describe your design considerations, assumptions, and trade-offs made during this exercise. Also feel free to include any notes about your submission

## Additional Considerations (if applicable)

- The UI should be responsive and look great at different browser viewport sizes
- Pixel-perfect implementation
- Routing and views (e.g. navigating to a given service from its card)
- State management with [Pinia](https://pinia.vuejs.org/)
- [Component Tests and/or Unit Tests](#run-component-and-unit-tests-with-vitest-and-optionally-vue-test-utils)
- Other items covered in your Panel 1 interview

## Evaluation

We will review your code for quality and your ability to talk through it, how you approach the UI, and what tradeoffs you make. Specifically we'll be looking at the following:

- How closely your implementation matches the design along with the other [Functional Requirements](#functional-requirements)
- Code quality, including appropriate componentization and modularity
- TypeScript usage
- Coding (and Vue) best-practices
- The project should pass type checking and build successfully
- How you dedicate the allotted time to focus on your strengths
- Test coverage, if applicable

## How to submit the project

You have up to a week to complete the exercise, but we don't expect you to spend more than a few hours on it.

When it's ready, please send your recruiter a link to the source code in a GitHub repository (no Pull Requests).

---

## Project Setup

### Clone the repository

```sh
git clone git@github.com:Kong/konnect-team-interview-frontend-exercise.git
```

### pnpm

This repository uses [`pnpm`](https://pnpm.io) rather than `npm` or `yarn`. [See here for instructions on installing pnpm](https://pnpm.io/installation).

### Install dependencies

```sh
pnpm install
```

### Compile and Hot-Reload for Development

Start the backend which serves the `services` API:

```sh
pnpm dev:server
```

In a separate terminal, start the Vue app:

```sh
pnpm dev:ui
```

## Searching the services endpoint

The local API is available at `http://localhost:4001` after running `pnpm dev:server`.

Searching this endpoint is supported by passing a query string with a value to search with (case-insensitive): `/api/services?q={value}`

**Note**: The search endpoint evaluates all property values as a `string` to determine a match.

### Searchable properties

The search endpoint is configured to search the following fields for each service within the JSON response:

```ts
{
  id: string;
  name: string;
  description: string;
  type: string;
}
```

### Search example

If I wanted to search for a service with "dogs" in the service name, I would pass the name in the query string:

```sh
GET: /api/services?q=dogs
```

### Linting and fixing the code

#### ESLint

```sh
# Run the linter
pnpm lint

# Fix linting errors
pnpm lint:fix
```

#### Stylelint

```sh
# Run stylelint
pnpm stylelint

# Fix stylelint errors
pnpm stylelint:fix
```

### Run Component and Unit Tests with [Vitest](https://vitest.dev/) and optionally [Vue Test Utils](https://test-utils.vuejs.org/)

Component and unit test files must be located in the `/src/` directory and have a filename format of `*.spec.ts`. In the starter project, see `src/components/ServiceCatalog.spec.ts` for an example.

```sh
# Run tests
pnpm test

# or run the tests in the Vitest UI
pnpm test:open
```

### Build and Minify for Production

```sh
pnpm build
```

### Preview your built application

First, you'll need to build the app

```sh
pnpm build
```

Next, run the API server

```sh
pnpm dev:server
```

Now run the `preview` command

```sh
pnpm preview
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

At Kong, we utilize [Conventional Commits](https://www.conventionalcommits.org/) in all of our repositories. [Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

If you're unfamiliar with conventional commits, it is **recommended** to use the following command in order to create your commits:

```sh
# Stage your changes
git add -A

# Trigger the commitizen CLI to help compose your commit message
pnpm commit
```

This will trigger the Commitizen interactive prompt for building your commit message.
