"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { loginSchema, type LoginValues } from "@/lib/validations/auth"
import { login } from "@/app/actions/auth"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FieldDescription, FieldGroup, Field } from "@/components/ui/field"
import { AuthIllustration } from "@/components/auth/AuthIllustration"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: LoginValues) {
    setError(null)
    startTransition(async () => {
      const response = await login(values)
      if (response?.error) {
        setError(response.error)
      } else {
        router.push('/')
        router.refresh()
      }
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your Visa Consultant account
                  </p>
                </div>

                {error && (
                  <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm font-medium">
                    {error}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            disabled={isPending}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="sr-only">Toggle password visibility</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Field>
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Logging in..." : "Login"}
                  </Button>
                </Field>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/signup" className="hover:underline font-medium">
                    Sign up
                  </a>
                </FieldDescription>
              </FieldGroup>
            </form>
          </Form>
          <div className="relative hidden md:block h-full border-l">
            <AuthIllustration />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="#" className="hover:underline">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="hover:underline">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
