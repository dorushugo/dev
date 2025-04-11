"use client";

import { useAuth } from "@/lib/auth-context";
import { useMessage } from "@/lib/message-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

// Composant Logo pour Autocar Location
const AutocarLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
  >
    <rect width="32" height="32" rx="4" fill="#2563EB" />
    <path
      d="M6 22H26V24C26 25.1046 25.1046 26 24 26H8C6.89543 26 6 25.1046 6 24V22Z"
      fill="#F8FAFC"
    />
    <rect x="7" y="12" width="18" height="10" rx="1" fill="#F8FAFC" />
    <rect x="8" y="14" width="4" height="3" rx="1" fill="#93C5FD" />
    <rect x="14" y="14" width="4" height="3" rx="1" fill="#93C5FD" />
    <rect x="20" y="14" width="4" height="3" rx="1" fill="#93C5FD" />
    <path
      d="M5 18C5 15.7909 6.79086 14 9 14H23C25.2091 14 27 15.7909 27 18V20C27 21.1046 26.1046 22 25 22H7C5.89543 22 5 21.1046 5 20V18Z"
      fill="#1D4ED8"
      fillOpacity="0.9"
    />
    <rect x="5" y="20" width="22" height="2" fill="#60A5FA" />
    <circle cx="9" cy="24" r="1.5" fill="#1E40AF" />
    <circle cx="23" cy="24" r="1.5" fill="#1E40AF" />
    <path d="M16 6L20 12H12L16 6Z" fill="#F8FAFC" />
  </svg>
);

export function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { getUnreadMessagesCount } = useMessage();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="border-b bg-background sticky top-0 z-50 shadow-sm">
      <div className="w-full flex h-16 items-center justify-between px-10 py-2 mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center text-2xl font-bold">
            <AutocarLogo />
            Autocar Location
          </Link>

          <div className="hidden md:flex gap-8">
            <Link
              href="/quote"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/quote") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Demander un devis
            </Link>

            <Link
              href="/partners"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/partners") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Nos partenaires
            </Link>

            {isAuthenticated && !isAdmin && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/dashboard")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Mon espace
              </Link>
            )}

            {isAdmin && (
              <>
                <Link
                  href="/admin/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/admin/dashboard")
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  Tableau de bord
                </Link>
                <Link
                  href="/admin/requests"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/admin/requests")
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  Demandes
                </Link>
                <Link
                  href="/admin/partners"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/admin/partners")
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  Partenaires
                </Link>
                <Link
                  href="/admin/messages"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/admin/messages")
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  Messages
                  {getUnreadMessagesCount(true) > 0 && (
                    <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {getUnreadMessagesCount(true)}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              {!isAdmin ? (
                <Link
                  href="/profile"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Bonjour, {user?.name}
                </Link>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Bonjour, {user?.name}
                </span>
              )}
              <Button variant="outline" size="sm" onClick={logout}>
                Déconnexion
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/register">
                <Button variant="ghost" size="sm">
                  S&apos;inscrire
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Connexion
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
