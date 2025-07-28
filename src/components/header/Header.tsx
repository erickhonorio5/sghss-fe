'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { menuData } from '@/components/header/menu-data';
import { useScrollEffect } from '@/hooks/header/useScrollEffect';

const linkClasses = {
  default: 'text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary',
  mobileItem: 'rounded-lg px-4 py-3 text-base font-medium hover:bg-accent dark:hover:bg-accent/50',
  primaryButton: 'bg-primary text-white hover:bg-opacity-90'
};

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = useScrollEffect(80);

  const desktopItems = menuData.filter(item => !item.mobileOnly);
  const mobileMainItems = menuData.filter(item => !item.isAuthAction);
  const mobileAuthItems = menuData.filter(item => item.isAuthAction);

  const headerClasses = `fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
      isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-border py-4 dark:bg-black'
          : 'py-7 bg-background dark:bg-black'
  }`;

  return (
      <header className={headerClasses}>
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 md:px-8 xl:px-0">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-10">
            {desktopItems.map((item) => (
                <Link
                    key={item.id}
                    href={item.path}
                    target={item.newTab ? '_blank' : '_self'}
                    className={`text-sm font-medium transition-colors ${linkClasses.default}`}
                >
                  {item.title}
                </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-5">
            <ThemeToggle />

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                  href="/auth/signin"
                  className={`px-4 py-1.5 text-sm font-medium transition ${linkClasses.default}`}
              >
                Entrar
              </Link>
              <Link
                  href="/auth/signup"
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition whitespace-nowrap ${linkClasses.primaryButton}`}
              >
                Cadastre-se
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden rounded-md p-2 transition hover:bg-accent"
                aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileOpen ? (
                  <X className="h-5 w-5 text-foreground dark:text-white" />
              ) : (
                  <Menu className="h-5 w-5 text-foreground dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
            <div className="fixed inset-0 top-[80px] z-40 bg-background/95 backdrop-blur-lg md:hidden">
              <div className="mx-auto max-w-screen-xl px-4 py-6">
                <nav className="flex flex-col gap-4">
                  {/* Main Menu Items */}
                  {mobileMainItems.map((item) => (
                      <Link
                          key={item.id}
                          href={item.path}
                          target={item.newTab ? '_blank' : '_self'}
                          onClick={() => setMobileOpen(false)}
                          className={`${linkClasses.default} ${linkClasses.mobileItem}`}
                      >
                        {item.title}
                      </Link>
                  ))}

                  {/* Auth Items */}
                  <div className="mt-4 flex flex-col gap-4">
                    {mobileAuthItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.path}
                            onClick={() => setMobileOpen(false)}
                            className={`rounded-lg px-4 py-3 text-base font-medium transition ${
                                item.isPrimary
                                    ? `${linkClasses.primaryButton} text-center`
                                    : `${linkClasses.default} ${linkClasses.mobileItem}`
                            }`}
                        >
                          {item.title}
                        </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
        )}
      </header>
  );
};