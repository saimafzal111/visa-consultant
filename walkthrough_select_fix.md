# Walkthrough - Fixing Controlled Select Warnings

I have resolved the "uncontrolled Select" warnings that were appearing in the console when interacting with the dropdowns in the **Visa Suggestion Form** and **Eligibility Score** components.

## Changes Made

### [VisaSuggestionForm.tsx](file:///d:/OneDrive/Desktop/visa-consultant/components/home/VisaSuggestionForm.tsx)
- **Initialized Form State**: Added `purpose` and `budget` to `defaultValues` in `useForm` (initialized as empty strings `""`).
- **Controlled Components**: Switched all `Select` components from `defaultValue={field.value}` to `value={field.value}`.

### [EligibilityScore.tsx](file:///d:/OneDrive/Desktop/visa-consultant/components/home/EligibilityScore.tsx)
- **Controlled Components**: Changed all `Select` components to use `value={field.value}`.

## Verification Results

### Console Check
- Performed a project-wide search for `defaultValue={field.value}` and confirmed no remaining instances exist in the `components` directory.
- The change from `defaultValue` to `value` ensures that the component's state is always synchronized with the form state, preventing the warning when the form initializes with empty strings.

### Functionality Test
- The forms now initialize with empty selections.
- Selecting an option updates the form state correctly without triggering any console warnings.
