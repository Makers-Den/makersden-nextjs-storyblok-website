# Button Component

A versatile button component based on shadcn/ui with multiple variants and sizes.

## Components

- **Button** - Standard button element
- **ButtonLink** - Button styled as a Next.js Link

## Button Usage

```typescript
import { Button } from '@/components/button';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// Icon buttons
<Button size="icon">
  <IconComponent />
</Button>
<Button size="icon-sm">
  <SmallIcon />
</Button>
<Button size="icon-lg">
  <LargeIcon />
</Button>

// Disabled
<Button disabled>Disabled</Button>

// With onClick
<Button onClick={() => console.log('clicked')}>
  Click me
</Button>
```

## Variants

- `default` - Primary button with solid background
- `destructive` - For destructive actions (delete, remove)
- `outline` - Outlined button with transparent background
- `secondary` - Secondary styling with muted colors
- `ghost` - Minimal styling, only visible on hover
- `link` - Styled as a link with underline on hover

## Sizes

- `default` - Standard button size (h-9, px-4, py-2)
- `sm` - Small button (h-8, px-3, text-xs)
- `lg` - Large button (h-10, px-8)
- `icon` - Square button for icons (h-9, w-9)
- `icon-sm` - Small icon button (h-8, w-8)
- `icon-lg` - Large icon button (h-10, w-10)

## Props

Extends all native HTML button attributes plus:

- `variant` - Button variant (see above)
- `size` - Button size (see above)
- `className` - Additional CSS classes
- All standard button props: `onClick`, `disabled`, `type`, etc.

## Examples in Context

### Form Submit Button

```typescript
<form onSubmit={handleSubmit}>
  <Button type="submit">Submit</Button>
</form>
```

### Confirmation Dialog

```typescript
<div className="flex gap-2">
  <Button variant="outline" onClick={onCancel}>
    Cancel
  </Button>
  <Button variant="destructive" onClick={onDelete}>
    Delete
  </Button>
</div>
```

### Call-to-Action

```typescript
<Button size="lg" onClick={onGetStarted}>
  Get Started
</Button>
```

### Icon Button with Lucide Icons

```typescript
import { Trash2, Edit, Download } from 'lucide-react';

<Button variant="ghost" size="icon" aria-label="Delete">
  <Trash2 />
</Button>

<Button variant="outline" size="icon" aria-label="Edit">
  <Edit />
</Button>

<Button size="icon" aria-label="Download">
  <Download />
</Button>
```

### Loading State

```typescript
<Button disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

## Accessibility

- Use descriptive button text or `aria-label` for icon buttons
- Set `type="button"` explicitly for non-submit buttons in forms
- Use `disabled` prop instead of custom disabled styling
- Ensure sufficient color contrast for all variants

## Styling

The Button component uses the project's design tokens from `globals.css`:

- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--destructive` / `--destructive-foreground`
- `--accent` / `--accent-foreground`
- `--ring` for focus states

All variants automatically support dark mode through the design token system.

## ButtonLink Component

A convenience component that combines Button styling with Next.js Link navigation.

### Usage

```typescript
import { ButtonLink } from '@/components/button';

// Basic link button
<ButtonLink href="/about">About Us</ButtonLink>

// With variants
<ButtonLink href="/contact" variant="outline">
  Contact
</ButtonLink>

<ButtonLink href="/signup" variant="default" size="lg">
  Sign Up Now
</ButtonLink>

// External link (automatically opens in new tab if external)
<ButtonLink href="https://example.com" variant="secondary">
  External Link
</ButtonLink>

// With prefetch control
<ButtonLink href="/products" prefetch={false}>
  Products
</ButtonLink>
```

### When to Use ButtonLink

- **Navigation within your app** - Use ButtonLink for internal routes
- **Call-to-action links** - Button styling with link semantics
- **SEO-friendly buttons** - Links are crawlable by search engines

### When to Use Regular Button

- **Form submissions** - Use Button with `type="submit"`
- **JavaScript actions** - Use Button with `onClick` handlers
- **Non-navigation actions** - Dialogs, toggles, etc.

### Props

ButtonLink accepts all Button props plus Next.js Link props:

- All Button props: `variant`, `size`, `className`
- `href` - Link destination (required)
- `prefetch` - Next.js prefetch behavior
- All anchor tag attributes

### Examples

**Navigation Buttons**:

```typescript
<nav className="flex gap-2">
  <ButtonLink href="/" variant="ghost">
    Home
  </ButtonLink>
  <ButtonLink href="/about" variant="ghost">
    About
  </ButtonLink>
  <ButtonLink href="/contact" variant="outline">
    Contact
  </ButtonLink>
</nav>
```

**Call-to-Action**:

```typescript
<ButtonLink href="/get-started" variant="default" size="lg">
  Get Started
</ButtonLink>
```

**Card Actions**:

```typescript
<div className="card">
  <h3>Product Name</h3>
  <p>Description...</p>
  <ButtonLink href="/products/123" variant="outline" size="sm">
    View Details
  </ButtonLink>
</div>
```
