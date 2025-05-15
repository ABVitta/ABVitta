
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Stethoscope, LogIn, UserCircle, LogOut, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from '@/lib/firebase'; // Updated import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const navItemsBase = [
  { label: "Início", href: "/" },
  { label: "Agendar Consulta", href: "/agendar" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Nossos Médicos", href: "/medicos" },
  { label: "Blog", href: "/blog" }, 
];

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
    <Stethoscope className="h-7 w-7 text-primary" />
    <div>
      <span className="text-primary">AB Vitta</span>
      <span className="block text-xs text-foreground/80 tracking-tighter">Clínica Médica</span>
    </div>
  </Link>
);

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authAvailable, setAuthAvailable] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (auth) {
      setAuthAvailable(true);
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoadingAuth(false);
      });
      return () => unsubscribe();
    } else {
      setAuthAvailable(false);
      setLoadingAuth(false);
    }
  }, []);

  const handleLogout = async () => {
    if (!auth) {
      console.error("Firebase Auth not available for logout.");
      return;
    }
    try {
      await signOut(auth);
      router.push("/"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  
  const navItems = [...navItemsBase];

  const UserNav = () => {
    if (!authAvailable) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-destructive-foreground bg-destructive/80 hover:bg-destructive">
                <AlertTriangle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Firebase não configurado. Autenticação indisponível.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    if (loadingAuth) {
      return <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full animate-pulse bg-muted"></Button>;
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || "User"} />
                <AvatarFallback>
                  {user.email ? user.email.charAt(0).toUpperCase() : user.phoneNumber ? user.phoneNumber.slice(-2) : <UserCircle className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.displayName || (user.phoneNumber ? `Usuário ${user.phoneNumber}` : user.email)}
                </p>
                {user.email && <p className="text-xs leading-none text-muted-foreground">{user.email}</p>}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/meu-painel')}>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Meu Painel</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
               <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link href="/login">
        <Button variant="outline" size="sm">
          <LogIn className="mr-2 h-4 w-4" />
          Área do Paciente
        </Button>
      </Link>
    );
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors relative py-1",
                pathname === item.href
                  ? "text-primary font-semibold after:content-[''] after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-full after:bg-primary"
                  : "text-foreground/70 hover:text-foreground/90"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-4">
            <UserNav />
          </div>
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <UserNav />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center mb-4">
                   <Logo />
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Fechar menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-lg font-medium py-2 rounded-md px-3 transition-colors",
                        pathname === item.href ? "text-primary bg-primary/10 font-semibold" : "text-foreground/80 hover:text-foreground hover:bg-muted"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
