# JDW Kong frontend test

Thank you for taking the time to consider my code test! I enjoyed building it out and I hope you enjoy seeing what I put together.

## Screenshots

### Light mode

![light](https://github.com/user-attachments/assets/3ecbdfe9-7b8d-493b-ae99-2cae74a6569d)

### Dark mode

![dark](https://github.com/user-attachments/assets/a649d3f6-0ae8-48a0-9f7d-48c56e7167e6)

### Responsive card list

![Mar-04-2025 12-00-33](https://github.com/user-attachments/assets/8ffdada4-4733-400d-9ef0-12411bdbcbd0)

### Responsive sevice page

![Mar-04-2025 11-59-15](https://github.com/user-attachments/assets/7731133c-2825-47bc-af24-250a189ac1e7)

## Considerations

### External libraries

Based on my conversation with A.G. and R.F. I was under the impression that I shouldn't use any external libraries for this code test with the exception of an icon library. If I was using other libraries I would have included:

- [Tailwindcss](https://tailwindcss.com/) for easier and faster styling
- [date-fns](https://date-fns.org/) for creating the "2 days ago" thing
- Something for debounce and throttle. Maybe it would be better to implement yourself than including Lodash for the thousandth time. Not sure. It would be nice to have something for throttling network requests from search though.

### Sort

We talked about how to sort the cards. Depending on use case we might want different sort algorithms (and you might want the user to choose), but for now I decided to just sort on the service title. I could see good arguments for sorting on `updated_at`, any of the metrics, or even frequency of access/usage. I _don't_ think there's a good argument for sorting based on created date.

### State

I didn't put a lot of things into Pinia, mostly due to time constraints. I think there's a world where you keep a global list of all services in state. This would make it so you can track pagination across routing and searching. Also it's not unreasonable to keep search results in state as well for similar reasons. That, and you could have search results not interfere with your complete list.

### "Not configured with runtime yet"

The relationship between `service.configured`, `service.published`, and `service.metrics` is confusing at best. There are four possible states between `configured` and `published` but the mock only shows three (published, unpublished, and in progress). Additionally it's not terribly clear why an unpublished service could ever show metrics. It's also not clear why something unpublished can have metrics but something that's in progress can't? I ended up trying to follow the mock but I'm not sure I got the logic exactly right.

### Typescript

I have not use typescript professionally before. I've used it in my personal projects, but I haven't had to build/maintain anything with a team using it. So, I'm not entirely sure what the best practices are for long term maintenance. My instinct is that you probably want to keep type definitions as close to where they're used as possible (hence adding them into `useServices.ts`). I suspect with larger files/codebases you might separate definitions into their own files, but for something this small that's probably unnecessary.

## Features to implement if I had more time

- Giving the user a way to reset after a search is executed. Right now you have to refresh or clear out the input field which isn't a good experience.
- Track pagination of services in state instead of in the component. That would allow you to keep track of what you're looking at even after page navigation.
- The search field doesn't focus as nicely as I would like when you don't click exactly in the input box. Easy to fix but a bit fiddly
- The pagination doesn't stay on screen in a nice way when you paginate. The design likely needs to change to handle this. Alternatively maaaaybe you could scroll to bottom on click?
- Avatar reaaaally should be its own component
- Allow dark mode to be saved in state and restored with localstorage instead of just relying on browser preference.
- More and better unit testing, I'll call out a few specific things that deserve testing below.

### Tests that should exist

- `ServiceCard.vue` needs some testing to ensure it renders content appropriately when data is missing and that its user interactions work (e.g. mailto links and route on click).
- `useServices.ts` should be robustly tested despite its simplicity. It is indirectly tested by `ServiceCatalog.spec.ts` but it deserves its own suite since it's so critical.
- `SearchInput.vue` should have a test making sure events are emitted as expected and that controlling it with clicks and "Enter" work.

## Minor issues with my code

- I don't love how I organized the css files. I think that for ease of use things that can reasonably be `@use`d anywhere should be in a lib directory while the ones that have styles and can only be included in `index.scss` should be more clearly important. I didn't clean this up due to time constraints.
- I used a `hover` variable set by `@mouseover` instead of `:hover` which isn't always a good idea. Normally I would have used [group and group-hover](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state) from Tailwind to solve the issues with hovering in parent/child components but I was asked not to use Tailwind. Implementing it manually (and cleanly) takes more time.
- Normally the avatar and avatar list would be their own components.
- The `+X` avatar badge has the wrong cursor and is clickable. I... am going to let that exist.
- My 404 page is... not a real 404 page. Also I don't have any route guards for errors
- I didn't implement the "2 days ago" thing in the service details because... it's annoying without date-fns (though very doable with native `Date` functions, but still)

### A yarn about pnpm, vim, and ale, oh my

I mentioned to A.G. and R.F. that I had issues with pnpm a few years ago... I was wrong! I made an offhand comment to them about how it was weird pnpm requires you to commit dependencies to your repo and I got a strange look from R.F. (fair). Turns out I wasn't remembering pnpm, I was remembering Yarn's plug'n'play setup which DOES recommend you commit dependencies which is a whole... choice. I figured this out because my normal editing environment (Vim) has a plugin which runs linters (Ale) and it doesn't handle the way pnpm installs dependencies correctly. As I was researching the issue, I ran into [a comment I made two years ago](https://github.com/dense-analysis/ale/issues/2970#issuecomment-815300052) and well, that jogged my memory.

In any case, the issue with Ale is that it tries to run the eslint executable directly from the `node_modules` folder and that errors out with `The package "eslint-plugin-promise" was not found` (you can reproduce this yourself by trying to run `node_modules/.pnpm/eslint@9.11.1_jiti@1.21.0/node_modules/eslint/bin/eslint.js src/App.vue`, though if you have eslint-plugin-promise globally installed it won't error probably). The simplest solution was to just add the following to my Vim configuration:

```
let g:ale_javascript_eslint_use_global = 1
let g:ale_javascript_eslint_executable = 'pnpm'
let g:ale_javascript_eslint_options = 'lint'
```

Which... I didn't want to do globally as my personal projects all use npm and don't have this issue, so that's why `.lvimrc` ([local vimrc](https://github.com/embear/vim-localvimrc)) got added to `.gitignore`.

## Minor issues with the project as given

- There is an extraneous comma in `tsconfig.json` on [line 27](https://github.com/Kong/konnect-team-interview-frontend-exercise/blob/main/tsconfig.json#L27).
- There are two extraneous commas in `tsconfig.build.json` on [lines 11 and 12](https://github.com/Kong/konnect-team-interview-frontend-exercise/blob/main/tsconfig.build.json#L11-L12)
- The readme says "[Don't treat the mock as gospel"](https://github.com/Kong/konnect-team-interview-frontend-exercise/blob/main/README.md?plain=1#L12) but then says "[Pixel-perfect implementation](https://github.com/Kong/konnect-team-interview-frontend-exercise/blob/main/README.md?plain=1#L33)" which is a bit contradictory. I think the intent was the former so I went with that primarily.
- The mock uses font Inter but the 2024 Kong brand guidelines recommends Roboto. I decided to use Inter for this test.
- The mock uses colors outside the 2024 Kong brand guidelines (though to be fair, so does the real app). I mostly followed the mock, but leaned on Kong brand guidelines several times.
- The project typescript isn't setup to use SFCs (without importing `defineComponent` anyways) and I strongly prefer that, so I used the same `env.d.ts` that [this reasonably decent example repo](https://github.com/mutoe/vue3-realworld-example-app/tree/master) uses. [Lots of people have this issue](https://stackoverflow.com/questions/54839057/vscode-showing-cannot-find-module-ts-error-for-vue-import-while-compiling-doe) and I'm slightly shocked that the [documentation](https://vuejs.org/guide/typescript/overview#usage-in-single-file-components) implies that you should be able to do it without any extra configuration.
- Project word doc says to use "In Progress" but mock says to use "In progress". I decided to trust the designer.
- `vitest.setup.ts` includes a plugin for `findTestId` which relies on [find](https://test-utils.vuejs.org/api/#find) but the documentation suggests you should use find for things that don't exist and [get](https://test-utils.vuejs.org/api/#get) for things that do exist. So I added `getTestId` and used it in one of my tests

### Links

- Figma Mock: <https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project>
- Acceptance criteria: <https://docs.google.com/document/d/1AIXTtrEMZBnfoLYXDlBYiEB-BTk7XNt2QlY7jWYdPv0/edit?tab=t.0#heading=h.8hapmwf98sj>

---

Mmmm, I may have sliiiightly gone over the time constraints just by typing this ~~book~~ readme.
