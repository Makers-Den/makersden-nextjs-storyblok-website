# Dependency Upgrade Plan

## Completed: Safe Minor/Patch Updates ✅

The following dependencies have been successfully upgraded to their latest minor/patch versions:

### Production Dependencies

- **@mux/mux-player-react**: 3.4.0 → 3.6.1
- **@radix-ui/react-accordion**: 1.2.11 → 1.2.12
- **@storyblok/react**: 5.0.0 → 5.4.16
- **@t3-oss/env-core**: 0.13.6 → 0.13.8
- **@t3-oss/env-nextjs**: 0.13.6 → 0.13.8
- **@vercel/og**: 0.6.8 → 0.8.5
- **lucide-react**: 0.511.0 → 0.546.0
- **next-intl**: 4.1.0 → 4.3.12
- **react**: 19.1.0 → 19.2.0
- **react-dom**: 19.1.0 → 19.2.0
- **storyblok-js-client**: 7.0.0 → 7.1.5
- **tailwind-merge**: 3.3.0 → 3.3.1

### Dev Dependencies

- **@babel/core**: 7.27.3 → 7.28.4
- **@swc/core**: 1.11.29 → 1.13.5
- **@tailwindcss/postcss**: 4.1.7 → 4.1.15
- **@testing-library/jest-dom**: 6.6.3 → 6.9.1
- **@types/react**: 19.1.6 → 19.2.2
- **@typescript-eslint/eslint-plugin**: 8.33.0 → 8.46.2
- **@typescript-eslint/parser**: 8.33.0 → 8.46.2
- **eslint**: 9.27.0 → 9.38.0
- **eslint-config-prettier**: 10.1.5 → 10.1.8
- **lint-staged**: 16.1.0 → 16.2.5
- **postcss**: 8.5.3 → 8.5.6
- **prettier**: 3.5.3 → 3.6.2
- **prettier-plugin-tailwindcss**: 0.6.11 → 0.6.14
- **react-test-renderer**: 19.1.0 → 19.2.0
- **tailwindcss**: 4.1.7 → 4.1.15
- **typescript**: 5.8.3 → 5.9.3

### Core Framework Updates (Phase 4)

- **next**: 15.3.2 → 16.0.0
- **@next/bundle-analyzer**: Updated to match Next.js 16
- **eslint-config-next**: Updated to match Next.js 16
- **zod**: 3.25.30 → 4.1.12

### Verification Results

All verification steps passed successfully:

- ✅ Type checking (`pnpm typecheck`) - No errors
- ✅ Linting (`pnpm lint:strict`) - No errors or warnings
- ✅ Production build (`pnpm build`) - Successful (expected Edge Runtime warning)

---

## Future: Major Version Updates ⚠️

The following packages have major version updates available that require careful planning and testing due to potential breaking changes:

### Critical Framework Updates

~~#### 1. Next.js 15.3.2 → 16.0.0~~ ✅ **COMPLETED**

~~#### 2. Zod 3.25.30 → 4.1.12~~ ✅ **COMPLETED**

**Note:** These have been successfully upgraded. See "Completed" section above for details.

### Testing & Quality Tools

#### 3. Jest 29.7.0 → 30.2.0 🟡 MEDIUM PRIORITY

**Affected packages:**

- `jest`
- `jest-environment-jsdom`
- `@jest/globals`
- `@types/jest`
- `babel-jest`

**Considerations:**

- Major version may change test configuration
- Review Jest 30 changelog
- Update jest.config.ts if needed
- Re-run all tests after upgrade

**Estimated effort:** Medium (4-6 hours)

#### 4. Commitlint 19.8.1 → 20.x 🟢 LOW PRIORITY

**Affected packages:**

- `@commitlint/cli`
- `@commitlint/config-conventional`

**Considerations:**

- May change commit message rules
- Review configuration changes
- Test with sample commits

**Estimated effort:** Low (1-2 hours)

### Type Definitions

#### 5. @types/node 22.15.22 → 24.9.1 🟡 MEDIUM PRIORITY

**Considerations:**

- Node.js type definitions
- May introduce stricter types
- Could surface previously hidden type errors
- Verify compatibility with Node.js version in use (>=20.11.1)

**Estimated effort:** Low-Medium (2-4 hours)

### Utility & CLI Tools

#### 6. Storyblok CLI 3.36.1 → 4.6.11 🟢 LOW PRIORITY

**Impact:**

- Dev dependency for `pull-components` command
- Used in `generate-sb-types` script

**Considerations:**

- Test component pulling functionality
- Verify script compatibility
- Check CLI command syntax changes

**Estimated effort:** Low (1-2 hours)

#### 7. cross-env 7.0.3 → 10.1.0 🟢 LOW PRIORITY

**Considerations:**

- Simple environment variable utility
- Review changelog for breaking changes
- Test scripts that use cross-env

**Estimated effort:** Low (1 hour)

#### 8. dotenv & dotenv-cli 🟢 LOW PRIORITY

**Packages:**

- dotenv: 16.5.0 → 17.2.3
- dotenv-cli: 8.0.0 → 10.0.0

**Considerations:**

- Environment variable loading utilities
- Test generate-sb-types script
- Verify .env.local loading

**Estimated effort:** Low (1 hour)

#### 9. eslint-plugin-storybook 0.12.0 → 9.1.13 🟡 MEDIUM PRIORITY

**⚠️ NOTE:** Unusual version jump (0.12 → 9.1) suggests major architectural changes or repository renaming.

**Current issue:**

```
eslint-plugin-storybook 0.12.0 depends on:
  @typescript-eslint/utils 8.26.0 which requires:
    typescript@">=4.8.4 <5.9.0"
    But we have: typescript@5.9.3
```

**Considerations:**

- Investigate version jump reason
- Check if this resolves TypeScript peer dependency warning
- May need to coordinate with TypeScript version
- Review Storybook linting rules changes

**Estimated effort:** Low-Medium (2-3 hours)

---

## Recommended Upgrade Strategy

### Phase 1: Low-Risk Utilities (Week 1)

1. **cross-env** 7 → 10
2. **dotenv & dotenv-cli** (16→17, 8→10)
3. **commitlint** 19 → 20
4. **storyblok CLI** 3 → 4

**Effort:** 1-2 days
**Risk:** Low

### Phase 2: Testing Infrastructure (Week 2)

1. **Jest ecosystem** 29 → 30
   - Update all Jest-related packages
   - Run full test suite
   - Update configuration if needed

**Effort:** 3-5 days
**Risk:** Medium

### Phase 3: Type System (Week 3)

1. **@types/node** 22 → 24
   - Update and verify no new type errors
2. **eslint-plugin-storybook** 0.12 → 9.1
   - Investigate version jump
   - Resolve TypeScript peer dependency warning

**Effort:** 2-3 days
**Risk:** Low-Medium

### Phase 4: Core Libraries ✅ COMPLETED

1. ~~**Zod** 3 → 4~~ ✅
   - Environment validation updated and tested
   - All schema definitions verified
2. ~~**Next.js** 16~~ ✅
   - Migration guide reviewed
   - App Router functionality tested
   - Visual Editor integration verified
   - Deployment on Vercel verified

**Effort:** 1-2 weeks
**Risk:** High

---

## Pre-Upgrade Checklist

Before upgrading any major version:

- [ ] Create a dedicated feature branch
- [ ] Review official migration guide/changelog
- [ ] Backup current working state
- [ ] Document current behavior/tests
- [ ] Allocate sufficient testing time
- [ ] Have rollback plan ready
- [ ] Update documentation after successful upgrade

---

## Notes

- **Current Node version requirement:** >=20.11.1
- **Package manager:** pnpm 9.1.1 (note: pnpm 10.19.0 available)
- All safe updates completed: 2025-10-22
- Production build verified successful after safe updates

---

## Package Manager Update (Optional)

**pnpm**: 9.1.1 → 10.19.0

Consider updating pnpm as well, though this is managed separately via:

```bash
# See: https://pnpm.io/installation
corepack prepare pnpm@10.19.0 --activate
```

Or update `packageManager` field in package.json and let Corepack handle it.
