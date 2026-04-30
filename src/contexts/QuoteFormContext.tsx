import { createContext, useContext, useState, ReactNode } from "react";

interface QuoteFormContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const QuoteFormContext = createContext<QuoteFormContextType | undefined>(undefined);

export function QuoteFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QuoteFormContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </QuoteFormContext.Provider>
  );
}

export function useQuoteForm() {
  const ctx = useContext(QuoteFormContext);
  if (!ctx) throw new Error("useQuoteForm must be used within QuoteFormProvider");
  return ctx;
}
