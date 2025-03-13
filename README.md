<div align="center">
  <h1>Makers' Den Website </h1>
  <p>Next.js + Tailwind CSS + TypeScript .</p>
</div>

# Canonical repository location

Clone this repo to start off your new project.
`git clone https://github.com/Makers-Den/makersden-storyblok-website.git`

# Getting Started

Run `pnpm install` to install all dependencies for a project.

After installing all dependencies run `pnpm dev` to run project locally on [localhost](http://localhost:3000/ 'localhost')

## Install needed tools globally

```
pnpm install -g dotenv-cli
pnpm install -g storyblok
```

# Deployment

[Production Link](https://makersden.io/ 'Production Link')

To make new production deployment push changes to main. Made sure that your github account is connected with makers@makersden.io vercel account.

Login to makers@makersden.io vercel account using magic link.

# Storyblok

The website template assumes Storyblok as the Headless CMS.
Template repository: [Makers' Den storyblok](https://app.storyblok.com/#/me/spaces/188026/dashboard "Makers' Den storyblok")

To setup local dev url run `pnpm dev && pnpm proxy`. (This cmd will setup https proxy for localhost on [https://localhost:3010](https://localhost:3010))

## Update the type definitions from Storyblok

To update type definitions run `pnpm generate-sb-types`.

Note:
Make sure that you have [storyblok cli](https://www.storyblok.com/docs/Guides/command-line-interface 'storyblok cli') installed and you are logged in (the account has to have access to the [Makers' Den storyblok](https://app.storyblok.com/#/me/spaces/188026/dashboard "Makers' Den storyblok") space).

# Page structure

All CMS generated pages are generated via the catch-all [...slug.tsx]

# Shadcn

Basic components can be generate using shadcn e.g.

```
npx shadcn-ui@latest add accordion
```

# Commit Message Convention

This starter is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

# Font Optimization

To optimize the font file size we used the solution from this article:
https://barrd.dev/article/create-a-variable-font-subset-for-smaller-file-size/
 