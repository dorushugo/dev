"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rediriger si l'utilisateur est déjà authentifié
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation de base
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.password
      ) {
        toast.error("Veuillez remplir tous les champs obligatoires");
        return;
      }

      // Validation du format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Format d'email invalide");
        return;
      }

      // Validation du mot de passe
      if (formData.password.length < 8) {
        toast.error("Le mot de passe doit comporter au moins 8 caractères");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }

      // Validation des conditions générales
      if (!acceptTerms) {
        toast.error("Vous devez accepter les conditions générales");
        return;
      }

      // Appel à la fonction d'inscription
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        password: formData.password,
      });

      toast.success("Inscription réussie ! Bienvenue chez Autocar Location.");
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      );
      console.error("Register error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Inscription</h1>
          <p className="text-sm text-muted-foreground">
            Créez votre compte pour accéder à nos services
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-bold text-center">
              Créer un compte
            </CardTitle>
            <CardDescription className="text-center">
              Inscrivez-vous pour accéder à toutes nos fonctionnalités
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone*</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Entreprise (optionnel)</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe*</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Le mot de passe doit contenir au moins 8 caractères
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmer le mot de passe*
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) =>
                    setAcceptTerms(checked === true)
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  J&apos;accepte les{" "}
                  <Link href="/terms" className="text-primary underline">
                    conditions générales
                  </Link>
                </label>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Création en cours..." : "Créer un compte"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center">
            <div className="text-sm text-muted-foreground mt-2">
              <span>Vous avez déjà un compte ? </span>
              <Link
                href="/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Connectez-vous
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
