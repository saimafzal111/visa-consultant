# Task: Implement Robust Validations & Auth Forms

## Supabase Integration (SSR)
- [x] Create `lib/supabase/client.ts` (Browser Client)
- [x] Create `lib/supabase/server.ts` (Server Client)
- [x] Create `lib/supabase/middleware.ts` (Session Management)

## Form Validation & Components
- [x] Create strict Zod schemas in `lib/validations/auth.ts`
- [x] Extract strict Zod schemas for all forms to `lib/validations/forms.ts`
- [x] Refactor `components/login-form.tsx` to use react-hook-form, zod, and Supabase Auth
- [x] Refactor `components/signup-form.tsx` to use react-hook-form, zod, and Supabase Auth
- [x] Refactor `EligibilityScore`, `ContactForm`, and `VisaSuggestionForm` to use external Zod schemas

## Application Routing
- [x] Ensure /login and /signup pages use the new components appropriately
- [x] Link `Navbar` items to correct pages
- [x] Handle proxy routing/auth guards via `middleware.ts`
