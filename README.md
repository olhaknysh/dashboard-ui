# Dashboard Application

Responsive dashboard application built with Angular.

Hosted on AWS
[https://dashboardhub.site](https://dashboardhub.site)

## Technologies Used

- **Angular 20+**: Standalone components, signals, modern syntaxes(@if, @for).
- **ngrx/signals**: Modern state management using Angular signals.
- **Angular Material**: UI component library for dialogs, icons, trees, and more.
- **Tailwind CSS**: Utility-first CSS framework for rapid, consistent styling.
- **TypeScript**: Strongly-typed language for scalable, maintainable code.
- **RxJS**: Reactive programming for state management and async flows.
- **Codia AI Design Figma Plugin**: Used for design handoff and generating UI code from Figma designs.
- **Cursor**: AI coding assistant for code generation, refactoring, and troubleshooting.

## AI & Design Tools

- **Cursor**: Used throughout development for code suggestions, refactoring, and troubleshooting. Used for creating complex components from screenshots.
- **Codia AI Design Figma Plugin**: Enabled seamless handoff from screenshot to Figma design.

## Project Structure

- `src/app/features/` — **Feature modules**. Each subfolder is a business domain or page (e.g., `accounts`, `dashboard`, `policies`). Contains feature-specific components, containers, and logic.
  - Example: `src/app/features/accounts/` (account-related UI, tables, forms, etc.)
- `src/app/shared/` — **Shared code**. Reusable components (buttons, dialogs, chips, icons, etc.), pipes, directives, and utility functions used across features.
  - Example: `src/app/shared/components/` (button, chip, dialog, etc.)
  - Example: `src/app/shared/pipes/` (custom pipes like currency, uppercase, etc.)
- `src/app/core/` — **Core services and configuration**. App-wide services, HTTP interceptors, constants, and core components (e.g., header, error handling).
- `src/app/store/` — **Global state management**. Signal stores for app-wide or cross-feature state (e.g., user, accounts, tasks, portfolio goals, etc.).
- `public/assets/data/` — **Mock data**. JSON files for local development and prototyping (e.g., accounts, policies, tasks, users, etc.).
- `src/styles.scss` — **Global styles**. Tailwind CSS and custom global styles.
- `angular.json`, `tsconfig.*.json` — **Configuration files** for Angular CLI, TypeScript, and build tooling.

**Component Structure:**

- Components use the Angular standalone API, with separate files for template (`.html`), styles (`.scss`), and interfaces (`.interface.ts`) when appropriate.
- Feature folders may contain subfolders for complex widgets (e.g., `account-status`, `performance-metrics`).

**Example:**

```
src/app/
  features/
    accounts/
      account-status/
        account-status.component.ts
        account-status.component.html
        account-status.component.scss
        account-status.component.interface.ts
      policies/
        components/
          policies-card.component.ts
      ...
    dashboard/
      my-accounts/
        my-accounts.component.ts
        ...
  shared/
    components/
      button/
      chip/
      ...
    pipes/
    directives/
    utility/
  core/
    components/
    constants/
    ...
  store/
    accounts/
    user/
    ...
public/
  assets/
    data/
      accounts.json
      policies.json
      ...
```

## Configuration & Tooling

- **Linting:**
  - Uses **ESLint** with Angular, TypeScript, and custom rules for code quality and consistency.
  - Lint config files: `.eslintrc.js`, `eslint.config.js`, and related files in the project root.

- **Husky:**
  - **Husky** is set up for git hooks to enforce code quality before commits.
  - Pre-commit hooks run linting, tests, and formatting automatically.
  - Configured in `.husky/` directory and referenced in `package.json`.

- **pnpm:**
  - Uses **pnpm** as the primary package manager for fast, disk-efficient installs.

## Setup Instructions

1. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Start the development server:**

   ```bash
   pnpm start
   # or
   npm start
   # or
   ng serve
   ```

   The app will be available at `http://localhost:4200/`.

3. **Build for production:**

   ```bash
   pnpm build
   # or
   ng build
   ```

4. **Run tests:**
   ```bash
   pnpm test
   # or
   ng test
   ```

## Notes

- The project uses Angular standalone components and modern best practices.
- All UI and business logic is type-safe and leverages Angular's latest features.
- Mock data is provided in `public/assets/data/` for local development and prototyping.
- For design consistency, all UI was aligned with Figma designs using the Codia AI plugin.
- Cursor was used as an AI pair programmer to speed up development and ensure code quality.
