import { QuoteForm } from "@/components/quote-form";

export default function QuotePage() {
  return (
    <div className="py-10 px-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Demander un devis
          </h1>
          <p className="text-muted-foreground">
            Remplissez le formulaire ci-dessous pour obtenir un devis
            personnalisé pour votre trajet en autocar.
          </p>
        </div>
        <QuoteForm />
        <div className="mt-8 rounded-lg bg-blue-50 p-4 text-sm">
          <h3 className="mb-2 font-medium">Comment ça marche ?</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Remplissez le formulaire avec les détails de votre trajet</li>
            <li>Estimez le prix pour avoir une idée du coût</li>
            <li>Envoyez votre demande et recevez une confirmation par email</li>
            <li>
              Notre équipe vous contactera sous 24h pour finaliser votre
              réservation
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
