import Link from "next/link";
import { Plane } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">
              Visa<span className="text-primary">Guide</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your AI-powered assistant for navigating global visa requirements effortlessly.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/visa-check" className="hover:text-primary">Find a Visa</Link></li>
            <li><Link href="/destinations" className="hover:text-primary">Country Directory</Link></li>
            <li><Link href="/#score" className="hover:text-primary">Eligibility Check</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
            <li><Link href="#" className="hover:text-primary">Guides</Link></li>
            <li><Link href="#" className="hover:text-primary">AI Advisor</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-primary">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} VisaGuide Consultancy System. All rights reserved.
      </div>
    </footer>
  );
}
