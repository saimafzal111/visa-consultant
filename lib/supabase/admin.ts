import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Admin client for tasks needing elevated privileges (e.g., service role tasks)
// Use sparingly, never expose service role key to the client.
export async function createAdminClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignores error when called from Server Component
          }
        },
      },
    }
  )
}
