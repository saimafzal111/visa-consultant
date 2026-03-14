import Link from "next/link";
import { Plane, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/auth/SignOutButton";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-primary" />
          <Link href="/" className="font-bold text-xl tracking-tight">
            Visa<span className="text-primary">Guide</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#suggestion" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Get Suggested
          </Link>
          <Link href="#directory" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Destinations
          </Link>
          <Link href="#score" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Eligibility Score
          </Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            // Logged in: show email avatar + sign out
            <>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="max-w-[150px] truncate">{user.email}</span>
              </div>
              <SignOutButton />
            </>
          ) : (
            // Not logged in: show Sign In + Apply Now
            <>
              <Link href="/login" className="hidden sm:inline-flex">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup" className="hidden sm:inline-flex">
                <Button>Apply Now</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
