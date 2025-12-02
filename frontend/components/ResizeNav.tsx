"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import Link from "next/link";
import { useState } from "react";

export default function GlobalNavbar() {
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Why OpenBox", link: "#why" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full  sticky  top-2 z-50  ">
      <Navbar >
        {/* ---- DESKTOP NAV ---- */}
        <NavBody className="border " >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              O
            </div>
            OpenBox
          </Link>

          {/* Desktop Menu */}
          <NavItems
            items={navItems.map((item) => ({
              name: item.name,
              link: item.link,
            }))}
          />

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <NavbarButton variant="secondary">Sign In</NavbarButton>
            </Link>

            <Link href="/signup">
              <NavbarButton variant="primary">Get Started</NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* ---- MOBILE NAV ---- */}
        <MobileNav>
          <MobileNavHeader>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                O
              </div>
              OpenBox
            </Link>

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="text-neutral-600 dark:text-neutral-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            <div className="flex flex-col gap-4 mt-4">
              <Link href="/login">
                <NavbarButton
                  variant="secondary"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </NavbarButton>
              </Link>

              <Link href="/signup">
                <NavbarButton
                  variant="primary"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
