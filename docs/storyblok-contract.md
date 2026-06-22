# Canonical Storyblok Contract

Date: 2026-06-02

The canonical schema/content source for both templates is the current template Storyblok space, space `286320`.

This template must not be connected to the production agency Storyblok space. `makersden-website-astro` and the legacy agency Next.js site are references only; their agency-only schema and integrations do not belong in the reusable templates.

## Component Contract

The lean reusable template contract contains exactly these Storyblok components:

| Role                           | Components                                                                                                                                                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page/content models            | `Page`, `Article`, `Author`, `Category`                                                                                                                                                                                               |
| Global/support models          | `GlobalSettings`, `Translations`, `RedirectItem`, `JsonLdMetadata`                                                                                                                                                                    |
| Navigation/footer/link support | `Link`, `SocialLink`, `FooterSection`, `NavSection`, `NavSectionLinkItem`                                                                                                                                                             |
| Renderable page blocks         | `HeroSection`, `HeroNarrowSection`, `HeroSplitSection`, `CtaSection`, `GridSection`, `FaqSection`, `FeaturedArticle`, `Image`, `LogosSection`, `PaginatedSection`, `RichTextContent`, `SplitContentSection`, `SplitSection`, `Teaser` |
| Nested UI/content blocks       | `CtaLink`, `FaqItem`, `IconAndTextCard`, `ImageAndTextCard`, `ImageCardLink`, `TitleAndText`                                                                                                                                          |

Do not rename components unless both template codebases, generated types, exported schema, and existing template content are updated in the same stage.

## Allowed Nesting

| Field                              | Allowed components                                                                                                                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Page.body`                        | `HeroSection`, `HeroNarrowSection`, `HeroSplitSection`, `CtaSection`, `GridSection`, `FaqSection`, `FeaturedArticle`, `Image`, `LogosSection`, `PaginatedSection`, `RichTextContent`, `SplitContentSection`, `SplitSection`, `Teaser` |
| `Page.additionalMetadata`          | `JsonLdMetadata`                                                                                                                                                                                                                      |
| `GlobalSettings.footerSections`    | `FooterSection`                                                                                                                                                                                                                       |
| `GlobalSettings.footerBottomLinks` | `Link`                                                                                                                                                                                                                                |
| `GlobalSettings.footerSocialLinks` | `SocialLink`                                                                                                                                                                                                                          |
| `GlobalSettings.navItems`          | `Link`, `NavSection`                                                                                                                                                                                                                  |
| `GlobalSettings.redirects`         | `RedirectItem`                                                                                                                                                                                                                        |
| `FooterSection.links`              | `Link`                                                                                                                                                                                                                                |
| `NavSection.items`                 | `NavSectionLinkItem`                                                                                                                                                                                                                  |
| `CtaSection.ctaLink`               | `CtaLink`                                                                                                                                                                                                                             |
| `HeroSection.ctaLinks`             | `CtaLink`                                                                                                                                                                                                                             |
| `HeroSplitSection.ctaLinks`        | `CtaLink`                                                                                                                                                                                                                             |
| `HeroSplitSection.rightSide`       | `Image`, `ImageCardLink`                                                                                                                                                                                                              |
| `HeroSplitSection.rightSideFill`   | `Image`                                                                                                                                                                                                                               |
| `GridSection.cards`                | `ImageAndTextCard`, `IconAndTextCard`                                                                                                                                                                                                 |
| `FaqSection.faqItems`              | `FaqItem`                                                                                                                                                                                                                             |
| `SplitContentSection.leftSection`  | `RichTextContent`                                                                                                                                                                                                                     |
| `SplitContentSection.rightSection` | `RichTextContent`                                                                                                                                                                                                                     |
| `SplitSection.leftContent`         | `Image`, `TitleAndText`, `ImageCardLink`, `CtaLink`                                                                                                                                                                                   |
| `SplitSection.rightContent`        | `Image`, `TitleAndText`, `ImageCardLink`, `CtaLink`                                                                                                                                                                                   |

The contract intentionally excludes stale/non-lean whitelist references such as `FeaturedAuthorStory`, `NestedGrid`, and `NavJournalSection`.

## Required Fields

Required fields are intentionally minimal and backward-compatible:

- `Article.title`, `Article.author`, `Article.date`, `Article.image`
- `FaqSection.faqItems`
- `FeaturedArticle.featuredArticle`
- `PaginatedSection.contentType`, `PaginatedSection.title`
- `Translations.example`

Do not add required fields unless existing template content is migrated at the same time.

## Datasources

The template space owns two reusable datasources:

| Datasource | Values                                                          |
| ---------- | --------------------------------------------------------------- |
| `colors`   | `red`, `green`, `blue`, `black`, `white`, `transparent`, `gray` |
| `spacing`  | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`       |

Datasource-backed fields should continue to use these shared template datasources rather than hard-coded agency values.

## Export And Types

The exported schema for this repo lives in `storyblok-components/components/286320/components.json`.

Regenerate after schema changes:

```bash
pnpm run generate-sb-types
```

The generated TypeScript contract lives in `src/lib/storyblok/blockLibraryTypes.ts`.

## Explicit Exclusions

Do not add agency-only schema or integrations to the templates by default: blog-specific `Post`/`PostsOverview`, Algolia, OpenAI/LLM context, Postmark, Slack, CookieYes/Stape/GTM defaults, Turnstile, content upload APIs, preview share links, Wistia/YouTube/Twitter embeds, Cloudflare cache invalidation, or production agency domain/config values.
