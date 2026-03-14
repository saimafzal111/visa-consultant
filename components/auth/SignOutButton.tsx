"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signout } from "@/app/actions/auth"

export function SignOutButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleSignOut() {
    startTransition(async () => {
      await signout()
      router.push("/login")
      router.refresh()
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSignOut}
      disabled={isPending}
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      {isPending ? "Signing out..." : "Sign Out"}
    </Button>
  )
}
