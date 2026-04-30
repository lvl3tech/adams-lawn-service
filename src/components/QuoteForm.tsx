import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  ClipboardList,
  Phone,
  Mail,
  MapPin,
  Trees,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useQuoteForm } from "../contexts/QuoteFormContext";
import {
  formatPhone,
  lookupCounty,
  searchAddresses,
  type AddressSuggestion,
} from "../data/tnGeo";

const DESTINATION_EMAIL = "info@adamslawnservicetn.com";

function getQuoteEndpoint(): string {
  const fromEnv = import.meta.env.VITE_QUOTE_API_URL as string | undefined;
  if (fromEnv && fromEnv.length > 0) return fromEnv.replace(/\/+$/, "") + "/api/quote";
  return "/api/quote";
}

const COUNTIES = [
  "Bedford", "Cannon", "Cheatham", "Coffee", "Davidson", "DeKalb", "Dickson",
  "Franklin", "Giles", "Hickman", "Lawrence", "Lincoln", "Marshall", "Maury",
  "Montgomery", "Moore", "Robertson", "Rutherford", "Sumner", "Warren",
  "Williamson", "Wilson", "Other",
];

const SERVICES = [
  "Mowing & Maintenance",
  "Fertilization",
  "Flower Bed Installation",
  "Mulch Installation",
  "Sod Layouts",
  "Patio Design & Construction",
  "Stone Wall Installation",
  "Fall Cleanup",
  "Snow Services",
];

const TIMELINES = ["As soon as possible", "Within 2 weeks", "Within a month", "Just exploring"];

const HEARD_FROM = ["Google", "Facebook", "Friend / Referral", "Driving by a job site", "Other"];

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  county: string;
  propertyType: "Residential" | "Commercial" | "";
  services: string[];
  details: string;
  timeline: string;
  heardFrom: string;
};

const EMPTY: FormData = {
  firstName: "", lastName: "", phone: "", email: "",
  address: "", address2: "", city: "", county: "", propertyType: "",
  services: [], details: "", timeline: "", heardFrom: "",
};

const STEPS = [
  { num: 1, label: "About You", icon: ClipboardList },
  { num: 2, label: "Property", icon: MapPin },
  { num: 3, label: "Services", icon: Trees },
  { num: 4, label: "Details", icon: FileText },
];

export function QuoteForm() {
  const { isOpen, close } = useQuoteForm();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showConsent, setShowConsent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Abort any in-flight submit when the dialog unmounts.
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<Element | null>(null);
  const resetTimer = useRef<number | null>(null);

  // Body scroll lock + Escape close + remember opener for focus restore
  useEffect(() => {
    if (!isOpen) return;
    openerRef.current = document.activeElement;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "Tab") trapFocus(e);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Initial focus on open
  useEffect(() => {
    if (isOpen && !submitted && step === 1) {
      const t = window.setTimeout(() => firstFieldRef.current?.focus(), 320);
      return () => window.clearTimeout(t);
    }
  }, [isOpen, step, submitted]);

  // Cancel any pending reset when reopening (fixes race when user closes & reopens fast)
  useEffect(() => {
    if (isOpen && resetTimer.current) {
      window.clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
  }, [isOpen]);

  // Cleanup pending timer on unmount
  useEffect(() => {
    return () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, []);

  function trapFocus(e: KeyboardEvent) {
    const root = dialogRef.current;
    if (!root) return;
    const focusable = root.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function handleClose() {
    close();
    // Restore focus to the element that opened the modal
    if (openerRef.current instanceof HTMLElement) {
      openerRef.current.focus();
    }
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      setStep(1);
      setData(EMPTY);
      setSubmitted(false);
      setErrors({});
      setShowConsent(false);
      resetTimer.current = null;
    }, 300);
  }

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function setMany(patch: Partial<FormData>) {
    setData((d) => ({ ...d, ...patch }));
    setErrors((e) => {
      const cleared: Partial<Record<keyof FormData, string>> = { ...e };
      for (const k of Object.keys(patch) as (keyof FormData)[]) cleared[k] = undefined;
      return cleared;
    });
  }

  function toggleService(s: string) {
    setData((d) => ({
      ...d,
      services: d.services.includes(s) ? d.services.filter((x) => x !== s) : [...d.services, s],
    }));
    setErrors((e) => ({ ...e, services: undefined }));
  }

  function validateStep(s: number): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!data.firstName.trim()) e.firstName = "Required";
      if (!data.lastName.trim()) e.lastName = "Required";
      if (!data.phone.trim()) e.phone = "Required";
      else if (!/[\d]{7,}/.test(data.phone.replace(/\D/g, ""))) e.phone = "Enter a valid phone";
      if (!data.email.trim()) e.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid email";
    }
    if (s === 2) {
      if (!data.city.trim()) e.city = "Required";
      if (!data.county) e.county = "Pick a county";
      if (!data.propertyType) e.propertyType = "Pick one";
    }
    if (s === 3) {
      if (data.services.length === 0) e.services = "Pick at least one";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleSubmit() {
    if (!validateStep(step)) return;
    setSubmitError(null);
    setShowConsent(true);
  }

  async function confirmAndSend() {
    if (submitStatus === "sending") return;
    setSubmitStatus("sending");
    setSubmitError(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      address2: data.address2,
      city: data.city,
      county: data.county,
      propertyType: data.propertyType,
      services: data.services,
      details: data.details,
      timeline: data.timeline,
      heardFrom: data.heardFrom,
      consentAt: new Date().toISOString(),
      source: typeof window !== "undefined" ? window.location.href : "",
      website: "", // honeypot — real users leave this empty
    };

    try {
      const res = await fetch(getQuoteEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (controller.signal.aborted) return;

      if (!res.ok || !body.ok) {
        setSubmitStatus("error");
        setSubmitError(
          body.error ||
            "We couldn't send your request just now. Please call (931) 703-9549 or try again in a moment.",
        );
        return;
      }

      setSubmitStatus("idle");
      setShowConsent(false);
      setSubmitted(true);
    } catch (err) {
      if (controller.signal.aborted) {
        // If we aborted because of the timeout (not because the dialog closed),
        // surface a friendly message. If the dialog closed, state is already
        // being torn down, so there's nothing useful to show.
        if (showConsent) {
          setSubmitStatus("error");
          setSubmitError(
            "That took longer than expected. Please try again, or call (931) 703-9549.",
          );
        }
        return;
      }
      setSubmitStatus("error");
      setSubmitError(
        "We couldn't reach our servers. Please check your connection and try again, or call (931) 703-9549.",
      );
    } finally {
      window.clearTimeout(timeoutId);
      if (abortRef.current === controller) abortRef.current = null;
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-brand-green-dark/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] bg-brand-cream shadow-2xl border-t-4 sm:border-4 border-brand-gold flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-green-dark text-brand-cream px-6 sm:px-8 py-5 flex items-center justify-between flex-shrink-0">
              <div>
                <p className="text-brand-gold font-bold uppercase tracking-widest text-xs">Adams Lawn Service & Landscaping</p>
                <h2 id={titleId} className="font-display text-2xl sm:text-3xl">
                  {submitted ? "Request Received" : "Request a Quote"}
                </h2>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close quote form"
                className="text-brand-cream/70 hover:text-brand-gold transition-colors p-2 -mr-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Step indicator */}
            {!submitted && (
              <div className="bg-brand-paper border-b border-brand-green-dark/10 px-6 sm:px-8 py-4 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  {STEPS.map((s, i) => {
                    const active = step === s.num;
                    const done = step > s.num;
                    return (
                      <div key={s.num} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-colors ${
                              done
                                ? "bg-brand-green border-brand-green text-brand-cream"
                                : active
                                ? "bg-brand-gold border-brand-gold text-brand-green-dark"
                                : "bg-brand-cream border-brand-green-dark/20 text-brand-green-dark/40"
                            }`}
                          >
                            {done ? <Check size={14} /> : s.num}
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs mt-1 uppercase tracking-wide font-bold ${
                              active ? "text-brand-green-dark" : "text-brand-green-dark/40"
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <div
                            className={`flex-1 h-px mx-2 mb-4 ${
                              done ? "bg-brand-green" : "bg-brand-green-dark/15"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
              {!submitted ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step === 1 && (
                      <StepOne
                        data={data}
                        set={set}
                        errors={errors}
                        firstFieldRef={firstFieldRef}
                      />
                    )}
                    {step === 2 && (
                      <StepTwo data={data} set={set} setMany={setMany} errors={errors} />
                    )}
                    {step === 3 && (
                      <StepThree data={data} toggleService={toggleService} errors={errors} />
                    )}
                    {step === 4 && <StepFour data={data} set={set} />}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <SuccessScreen data={data} email={DESTINATION_EMAIL} />
              )}
            </div>

            {/* Footer */}
            {!submitted && (
              <div className="border-t border-brand-green-dark/10 px-6 sm:px-8 py-4 flex items-center justify-between bg-brand-paper flex-shrink-0">
                <button
                  onClick={prev}
                  disabled={step === 1}
                  className="flex items-center gap-2 text-brand-green-dark font-bold uppercase tracking-widest text-sm hover:text-brand-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} /> Back
                </button>
                <p className="text-xs text-brand-green-dark/60 font-medium" aria-live="polite">
                  Step {step} of {STEPS.length}
                </p>
                {step < STEPS.length ? (
                  <button
                    onClick={next}
                    className="flex items-center gap-2 bg-brand-green-dark text-brand-cream px-5 py-3 font-bold uppercase tracking-widest text-sm hover:bg-brand-green transition-colors"
                  >
                    Next <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-brand-gold text-brand-green-dark px-5 py-3 font-bold uppercase tracking-widest text-sm hover:bg-brand-gold-light transition-colors"
                  >
                    Submit <Check size={18} />
                  </button>
                )}
              </div>
            )}

            {/* Consent confirmation overlay */}
            <ConsentDialog
              open={showConsent}
              firstName={data.firstName}
              email={DESTINATION_EMAIL}
              onCancel={() => {
                if (submitStatus === "sending") {
                  // Abort the in-flight submission so the user isn't trapped.
                  abortRef.current?.abort();
                }
                setShowConsent(false);
                setSubmitStatus("idle");
                setSubmitError(null);
              }}
              onConfirm={confirmAndSend}
              status={submitStatus}
              errorMessage={submitError}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AddressAutocompleteField({
  value,
  onChange,
  onSelect,
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (s: AddressSuggestion) => void;
}) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const skipNextSearch = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<number | null>(null);
  const blurTimer = useRef<number | null>(null);
  const errId = useId();

  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return;
    }
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();
    const q = value.trim();
    if (q.length < 4) {
      setSuggestions([]);
      setSearched(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = window.setTimeout(async () => {
      const ac = new AbortController();
      abortRef.current = ac;
      try {
        const results = await searchAddresses(q, ac.signal);
        setSuggestions(results);
        setSearched(true);
        setHighlight(-1);
        setOpen(true);
      } catch {
        // Aborted or network error — quietly ignore
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    }, 350);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [value]);

  useEffect(() => {
    return () => {
      if (blurTimer.current) window.clearTimeout(blurTimer.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  function pick(s: AddressSuggestion) {
    skipNextSearch.current = true;
    onSelect(s);
    setOpen(false);
    setSuggestions([]);
    setSearched(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h <= 0 ? suggestions.length - 1 : h - 1));
    } else if (e.key === "Enter") {
      if (highlight >= 0) {
        e.preventDefault();
        pick(suggestions[highlight]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const showDropdown = open && (loading || suggestions.length > 0 || (searched && value.trim().length >= 4));

  return (
    <Field label="Street address">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0 || searched) setOpen(true);
          }}
          onBlur={() => {
            if (blurTimer.current) window.clearTimeout(blurTimer.current);
            blurTimer.current = window.setTimeout(() => setOpen(false), 150);
          }}
          onKeyDown={onKeyDown}
          placeholder="Enter your street address"
          className={inputCls}
          autoComplete="off"
          spellCheck={false}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={errId}
          aria-autocomplete="list"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-block w-4 h-4 border-2 border-brand-green-dark/30 border-t-brand-green-dark rounded-full animate-spin" />
        )}
        {showDropdown && (
          <ul
            id={errId}
            role="listbox"
            className="absolute z-30 left-0 right-0 mt-1 max-h-72 overflow-y-auto bg-brand-cream border-2 border-brand-green-dark/30 shadow-xl rounded-sm"
          >
            {suggestions.map((s, i) => (
              <li key={s.id} role="option" aria-selected={highlight === i}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(s)}
                  onMouseEnter={() => setHighlight(i)}
                  className={`block w-full text-left px-4 py-2.5 text-sm border-b border-brand-green-dark/10 last:border-0 transition-colors ${
                    highlight === i
                      ? "bg-brand-paper text-brand-green-dark"
                      : "text-brand-text hover:bg-brand-paper"
                  }`}
                >
                  <span className="font-bold text-brand-green-dark">
                    {s.street}
                  </span>
                  <span className="block text-xs text-brand-text/70">
                    {[s.city, s.county && `${s.county} County`, "TN"]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </button>
              </li>
            ))}
            {!loading && suggestions.length === 0 && (
              <li className="px-4 py-3 text-xs text-brand-text/60 font-medium">
                No matches in Tennessee — keep typing or fill in the fields below manually.
              </li>
            )}
            <li className="px-4 py-2 text-[10px] text-brand-text/50 font-medium uppercase tracking-widest border-t border-brand-green-dark/10 bg-brand-paper">
              Powered by OpenStreetMap
            </li>
          </ul>
        )}
      </div>
    </Field>
  );
}

function ConsentDialog({
  open,
  firstName,
  email,
  onCancel,
  onConfirm,
  status,
  errorMessage,
}: {
  open: boolean;
  firstName: string;
  email: string;
  onCancel: () => void;
  onConfirm: () => void;
  status: "idle" | "sending" | "error";
  errorMessage: string | null;
}) {
  const sending = status === "sending";
  const headingId = useId();
  const descId = useId();
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => confirmRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCancel();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 z-10 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-brand-green-dark/75 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={headingId}
            aria-describedby={descId}
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-lg bg-brand-cream border-t-4 sm:border-4 border-brand-gold shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
          >
            <div className="bg-brand-green-dark text-brand-cream px-6 py-5 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={20} className="text-brand-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">
                  One quick check
                </p>
                <h3 id={headingId} className="font-display text-xl sm:text-2xl leading-tight">
                  Before we send your request
                </h3>
              </div>
            </div>

            <div id={descId} className="px-6 py-6 overflow-y-auto text-brand-text">
              <p className="font-medium mb-4">
                {firstName ? `Thanks, ${firstName}. ` : ""}By tapping
                {" "}<span className="font-bold text-brand-green-dark">Agree &amp; send</span>,
                you give Adams Lawn Service &amp; Landscaping permission to contact you by
                phone, text, or email about your project.
              </p>
              <ul className="space-y-2.5 text-sm font-medium border-l-2 border-brand-gold/60 pl-4 mb-4">
                <li>
                  <span className="font-bold text-brand-green-dark">Family business, not a call center.</span>{" "}
                  We use your information only to follow up on this request.
                </li>
                <li>
                  <span className="font-bold text-brand-green-dark">Never sold, never shared.</span>{" "}
                  No marketing lists, no third parties.
                </li>
                <li>
                
                  <span className="font-bold text-brand-green-dark">Stop anytime.</span>{" "}
                  Standard message and data rates may apply for any text.
            
                </li>
              </ul>
              <p className="text-xs text-brand-text/70 font-medium">
                See our{" "}
                <a
                  href={`${import.meta.env.BASE_URL}privacy`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold text-brand-green-dark hover:text-brand-gold"
                >
                  Privacy Policy
                </a>{" "}
                for the full details.
              </p>
            </div>

            {status === "error" && errorMessage && (
              <div
                role="alert"
                className="mx-6 mb-4 px-4 py-3 border-l-4 border-red-700 bg-red-50 text-red-900 text-sm font-medium"
              >
                {errorMessage}
              </div>
            )}
            <div className="border-t border-brand-green-dark/10 px-6 py-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-3 bg-brand-paper flex-shrink-0">
              <button
                type="button"
                onClick={onCancel}
                className="text-brand-green-dark font-bold uppercase tracking-widest text-sm px-4 py-3 hover:text-brand-gold transition-colors"
              >
                {sending ? "Stop" : "Cancel"}
              </button>
              <button
                ref={confirmRef}
                type="button"
                onClick={onConfirm}
                disabled={sending}
                aria-busy={sending}
                className="flex items-center justify-center gap-2 bg-brand-gold text-brand-green-dark px-5 py-3 font-bold uppercase tracking-widest text-sm hover:bg-brand-gold-light transition-colors disabled:opacity-70 disabled:cursor-wait"
              >
                {sending ? (
                  <>
                    <span
                      className="inline-block w-4 h-4 border-2 border-brand-green-dark/30 border-t-brand-green-dark rounded-full animate-spin"
                      aria-hidden="true"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <Check size={18} aria-hidden="true" /> Agree &amp; send
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Sub-step components ---------------- */

function Field({
  label,
  required,
  error,
  errorId,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-widest text-brand-green-dark mb-2">
        {label} {required && <span className="text-brand-gold" aria-label="required">*</span>}
      </span>
      {children}
      {error && (
        <span id={errorId} className="block mt-1 text-xs text-red-700 font-bold">
          {error}
        </span>
      )}
    </label>
  );
}

const inputCls =
  "w-full bg-brand-cream border-2 border-brand-green-dark/20 px-4 py-3 text-brand-text font-medium focus:outline-none focus:border-brand-green-dark transition-colors rounded-sm";

function StepOne({
  data,
  set,
  errors,
  firstFieldRef,
}: {
  data: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
  errors: Partial<Record<keyof FormData, string>>;
  firstFieldRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div className="space-y-5">
      <p className="text-brand-text/70 font-medium mb-4">
        Tell us a little about yourself so we can follow up.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First name" required error={errors.firstName} errorId="err-firstName">
          <input
            ref={firstFieldRef}
            type="text"
            value={data.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            className={inputCls}
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "err-firstName" : undefined}
          />
        </Field>
        <Field label="Last name" required error={errors.lastName} errorId="err-lastName">
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            className={inputCls}
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "err-lastName" : undefined}
          />
        </Field>
      </div>
      <Field label="Phone" required error={errors.phone} errorId="err-phone">
        <input
          type="tel"
          inputMode="tel"
          value={data.phone}
          onChange={(e) => set("phone", formatPhone(e.target.value))}
          placeholder="(931) 555-0123"
          className={inputCls}
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "err-phone" : undefined}
        />
      </Field>
      <Field label="Email" required error={errors.email} errorId="err-email">
        <input
          type="email"
          value={data.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@example.com"
          className={inputCls}
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "err-email" : undefined}
        />
      </Field>
    </div>
  );
}

function StepTwo({
  data,
  set,
  setMany,
  errors,
}: {
  data: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
  setMany: (patch: Partial<FormData>) => void;
  errors: Partial<Record<keyof FormData, string>>;
}) {
  function handleCityChange(v: string) {
    const patch: Partial<FormData> = { city: v };
    if (!data.county) {
      const c = lookupCounty(v);
      if (c) patch.county = c;
    }
    setMany(patch);
  }
  return (
    <div className="space-y-5">
      <p className="text-brand-text/70 font-medium mb-4">Where is the property?</p>
      <AddressAutocompleteField
        value={data.address}
        onChange={(v) => set("address", v)}
        onSelect={(s) => {
          const patch: Partial<FormData> = { address: s.street };
          if (s.city) patch.city = s.city;
          if (s.county) patch.county = s.county;
          setMany(patch);
        }}
      />
      <Field label="Apt, Suite, Unit, Building (optional)">
        <input
          type="text"
          value={data.address2}
          onChange={(e) => set("address2", e.target.value)}
          placeholder="Apt 4B, Suite 200, Bldg C…"
          className={inputCls}
          autoComplete="address-line2"
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="City" required error={errors.city} errorId="err-city">
          <input
            type="text"
            value={data.city}
            onChange={(e) => handleCityChange(e.target.value)}
            placeholder="Franklin"
            className={inputCls}
            autoComplete="address-level2"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "err-city" : undefined}
          />
        </Field>
        <Field label="County" required error={errors.county} errorId="err-county">
          <select
            value={data.county}
            onChange={(e) => set("county", e.target.value)}
            className={inputCls}
            aria-invalid={!!errors.county}
            aria-describedby={errors.county ? "err-county" : undefined}
          >
            <option value="">Select a county…</option>
            {COUNTIES.map((c) => (
              <option key={c} value={c}>
                {c} {c !== "Other" ? "County" : ""}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <fieldset>
        <legend className="block text-xs font-bold uppercase tracking-widest text-brand-green-dark mb-2">
          Property type <span className="text-brand-gold" aria-label="required">*</span>
        </legend>
        <div role="radiogroup" aria-label="Property type" className="grid grid-cols-2 gap-3">
          {(["Residential", "Commercial"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={data.propertyType === t}
              onClick={() => set("propertyType", t)}
              className={`px-4 py-3 border-2 font-bold uppercase tracking-widest text-sm transition-colors rounded-sm ${
                data.propertyType === t
                  ? "border-brand-green-dark bg-brand-green-dark text-brand-cream"
                  : "border-brand-green-dark/20 bg-brand-cream text-brand-green-dark hover:border-brand-green-dark/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.propertyType && (
          <p className="mt-1 text-xs text-red-700 font-bold">{errors.propertyType}</p>
        )}
      </fieldset>
    </div>
  );
}

function StepThree({
  data,
  toggleService,
  errors,
}: {
  data: FormData;
  toggleService: (s: string) => void;
  errors: Partial<Record<keyof FormData, string>>;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-brand-text/70 font-medium mb-1">Which services are you interested in?</p>
        <p className="text-xs text-brand-text/50 font-medium">Select all that apply.</p>
      </div>
      <div role="group" aria-label="Services requested" className="flex flex-wrap gap-2">
        {SERVICES.map((s) => {
          const active = data.services.includes(s);
          return (
            <button
              key={s}
              type="button"
              aria-pressed={active}
              onClick={() => toggleService(s)}
              className={`px-4 py-2 border-2 font-bold uppercase tracking-wide text-xs transition-colors rounded-full ${
                active
                  ? "border-brand-gold bg-brand-gold text-brand-green-dark"
                  : "border-brand-green-dark/20 bg-brand-cream text-brand-green-dark hover:border-brand-green-dark/50"
              }`}
            >
              {active && <Check size={12} className="inline mr-1 -mt-0.5" aria-hidden="true" />}
              {s}
            </button>
          );
        })}
      </div>
      {errors.services && <p className="text-xs text-red-700 font-bold">{errors.services}</p>}
    </div>
  );
}

function StepFour({
  data,
  set,
}: {
  data: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <p className="text-brand-text/70 font-medium mb-4">
        Anything else we should know? Optional but helpful.
      </p>
      <Field label="When would you like to start?">
        <select
          value={data.timeline}
          onChange={(e) => set("timeline", e.target.value)}
          className={inputCls}
        >
          <option value="">Select a timeline…</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Tell us about your project">
        <textarea
          value={data.details}
          onChange={(e) => set("details", e.target.value)}
          rows={5}
          placeholder="Lot size, what you're hoping for, photos you can share later…"
          className={inputCls + " resize-none"}
        />
      </Field>
      <Field label="How did you hear about us?">
        <select
          value={data.heardFrom}
          onChange={(e) => set("heardFrom", e.target.value)}
          className={inputCls}
        >
          <option value="">Select one…</option>
          {HEARD_FROM.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </Field>
    </div>
  );
}

function SuccessScreen({ data, email }: { data: FormData; email: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto bg-brand-green text-brand-cream rounded-full flex items-center justify-center mb-6">
        <Check size={32} />
      </div>
      <h3 className="font-display text-3xl text-brand-green-dark mb-3">Thanks, {data.firstName}!</h3>
      <p className="text-brand-text/80 max-w-md mx-auto mb-8 font-medium">
        Your request just landed with our team. We'll be in touch soon — usually a quick call or
        text — to walk through the details and put your quote together.
      </p>
      <div className="bg-brand-paper border border-brand-green-dark/10 p-6 max-w-sm mx-auto">
        <p className="text-xs uppercase tracking-widest font-bold text-brand-gold mb-2">
          Need it sooner?
        </p>
        <a
          href="tel:9317039549"
          className="flex items-center justify-center gap-2 text-brand-green-dark font-display text-2xl hover:text-brand-gold transition-colors"
        >
          <Phone size={22} aria-hidden="true" /> (931) 703-9549
        </a>
      </div>
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 mt-6 text-sm text-brand-green-dark/60 font-bold uppercase tracking-widest hover:text-brand-green-dark transition-colors"
      >
        <Mail size={14} aria-hidden="true" /> {email}
      </a>
    </div>
  );
}
