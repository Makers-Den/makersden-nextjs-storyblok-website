<div align="center">
  <h1>Makers' Den Wesite </h1>
  <p>Next.js + Tailwind CSS + TypeScript .</p>
</div>

# Internal Docs

TODO

# Canonical repository location

Clone this repo to start off your new project.
`git clone https://github.com/Makers-Den/makersden-website.git`

# Getting Started

Run `yarn install` to install all dependencies for a project.

After installing all dependencies run `yarn dev` to run project locally on [localhost](http://localhost:3000/ 'localhost')

# Deployment

[Production Link](https://makersden.io/ 'Production Link')

To make new production deployment push changes to main. Made sure that your github account is connected with makers@makersden.io vercel account.

Login to makers@makersden.io vercel account using magic link.

# Storyblok

The website template assumes Storyblok as the Headless CMS.
Template repository: [Makers' Den storyblok](https://app.storyblok.com/#/me/spaces/188026/dashboard "Makers' Den storyblok")

To setup local dev url run `yarn dev && yarn proxy`. (This cmd will setup https proxy for localhost on [https://localhost:3010](https://localhost:3010))

## Update the type definitions from Storyblok

To update type definitions run `yarn generate-sb-types`.

Note:
Made sure that you have [storyblok cli](https://www.storyblok.com/docs/Guides/command-line-interface 'storyblok cli') installed and you are logged in (the account has to have access to the [Makers' Den storyblok](https://app.storyblok.com/#/me/spaces/188026/dashboard "Makers' Den storyblok") space).

# Page structure

All CMS generated pages are generated via the catch-all [...slug.tsx]

# Commit Message Convention

This starter is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

# Font Optimization

To optimize the font file size we used the solution from this article:
https://barrd.dev/article/create-a-variable-font-subset-for-smaller-file-size/

# Links to marketing & search resources

TODO

# Long-term chat memory using Pinecone database

Read more in [`/api/storyblok-publish`](./src/pages/api/storyblok-publish/README.md) README file

# Offloading third party scripts using Partytown

Read more in [Partytown](./src/components/gtm-scripts/PartytownReadme.md) README file
