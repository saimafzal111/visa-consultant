# Visa Consultancy & Guidance System Frontend Plan

## Goal Description
Build a stunning, interactive, and responsive frontend for the Visa Consultancy & Guidance System. The app will include a hero section, visa suggestion form, AI advisor UI, information directory, eligibility score calculator, visa roadmap, heatmap, and contact form.

The app uses Next.js 16, React Hook Form, Zod, TanStack Query, and Framer Motion for animations.

## Proposed Changes

### Configuration and Setup
- Install necessary dependencies (`framer-motion`, `@hookform/resolvers`, `lucide-react`, `clsx`, `tailwind-merge`).
- Setup global CSS and add a premium, dark-mode friendly color palette.
- Configure shadcn components. 

### Global UI Components
#### [NEW] `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/card.tsx`, etc.
- Generate core shadcn UI components.
#### [NEW] `components/layout/Navbar.tsx`
- Build a responsive navigation bar.
#### [NEW] `components/layout/Footer.tsx`
- Build a standard footer.

### Page Sections
#### [MODIFY] `app/page.tsx`
- Combine all the sections below into a scrolling single-page or simple multi-page layout.
#### [NEW] `components/home/HeroSection.tsx`
- Create a modern, animated hero section with Framer Motion.
#### [NEW] `components/home/VisaSuggestionForm.tsx`
- Implementation of React Hook Form + Zod for collecting user travel details.
#### [NEW] `components/home/AIVisaAdvisor.tsx`
- A chat-like UI mock for the AI advisor.
#### [NEW] `components/home/VisaInformationDirectory.tsx`
- A grid/list of country-wise visa details.
#### [NEW] `components/home/EligibilityScore.tsx`
- A visual meter for the visa eligibility score.
#### [NEW] `components/home/VisaRoadmap.tsx`
- A stepper component for the visa application process.
#### [NEW] `components/home/RequirementsHeatmap.tsx`
- A map or visual indicator showing countries marked as Easy, Medium, Difficult.
#### [NEW] `components/home/ContactForm.tsx`
- A contact form using React Hook Form.

## Verification Plan

### Automated Tests
- Run `npm run build` and `npm run lint` to ensure there are no compilation or typing errors.
- Ensure shadcn components integrate correctly.

### Manual Verification
- Use `npm run dev` and open the browser using the Browser tool to verify:
  - Hero animations and visual impact ("Wow" factor).
  - React Hook Form validation visually works.
  - Overall responsive design on mobile and desktop views.
