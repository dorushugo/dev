"use client";

import { AuthProvider } from "@/lib/auth-context";
import { MessageProvider } from "@/lib/message-context";
import { PartnerProvider } from "@/lib/partner-context";
import { QuoteProvider } from "@/lib/quote-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QuoteProvider>
        <PartnerProvider>
          <MessageProvider>{children}</MessageProvider>
        </PartnerProvider>
      </QuoteProvider>
    </AuthProvider>
  );
}
