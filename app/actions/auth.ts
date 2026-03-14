'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loginSchema, signupSchema } from '@/lib/validations/auth'
import * as z from 'zod'

export async function login(values: z.infer<typeof loginSchema>) {
  const supabase = await createClient()

  // Validate on server as well
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validatedFields.data

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Make Supabase errors user-friendly
    if (error.message.toLowerCase().includes('email not confirmed')) {
      return { error: 'Please confirm your email address before logging in. Check your inbox for a confirmation link.' }
    }
    if (error.message.toLowerCase().includes('invalid login credentials')) {
      return { error: 'Incorrect email or password. Please try again.' }
    }
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(values: z.infer<typeof signupSchema>) {
  const supabase = await createClient()

  // Validate on server
  const validatedFields = signupSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password, fullName, phone } = validatedFields.data

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/') // Redirect to home page
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
