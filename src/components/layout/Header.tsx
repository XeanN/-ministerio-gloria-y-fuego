"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-night/10 bg-background/95 text-night backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo tone="dark" />

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-0">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "rounded-md px-2 py-2 text-xs text-night/75 transition-colors hover:bg-sage hover:text-night",
                    pathname === item.href && "font-semibold text-calm-dark",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button asChild size="sm" className="hidden bg-calm text-white hover:bg-calm-dark xl:inline-flex">
          <Link href="/peticiones">Pedir oración</Link>
        </Button>

        <button
          type="button"
          className="rounded-md p-2 text-night hover:bg-sage xl:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Principal móvil" className="border-t border-night/10 bg-background xl:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-3 text-base text-night/80 hover:bg-sage",
                    pathname === item.href && "font-semibold text-calm-dark",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
