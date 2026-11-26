import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, RotateCcw, ShieldAlert, X } from 'lucide-react';
import { UI_COPY, type Language } from '../data/i18n';
import type { VzService } from '../data/services';
import { calculateAgeFromDob } from '../hooks/useSsoSession';

interface AdultGateModalProps {
  service: VzService | null;
  lang: Language;
  onClose: () => void;
}

const ADULT_GATE_STORAGE_KEY = 'vz_21zone_verified';

interface StoredAdultVerification {
  verifiedAt: string;
  age: number;
}

export function AdultGateModal({ service, lang, onClose }: AdultGateModalProps) {
  const t = UI_COPY[lang];
  const gateCopy = t.adultGate;

  const [dobInput, setDobInput] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [verifiedAge, setVerifiedAge] = useState<number | null>(() => {
    try {
      const raw = sessionStorage.getItem(ADULT_GATE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoredAdultVerification>;
        if (typeof parsed.age === 'number' && parsed.age >= 21) {
          return parsed.age;
        }
      }
    } catch {
      // Ignore sessionStorage errors
    }
    return null;
  });

  useEffect(() => {
    if (!service) return;
    setErrorMsg('');
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [service, onClose]);

  if (!service) return null;

  const launchHref = service.launchUrl || `https://${service.primaryDomain}`;

  const handleVerifySubmit = (e: FormEvent) => {
    e.preventDefault();
    const calculated = calculateAgeFromDob(dobInput);
    if (calculated === null) {
      setErrorMsg(gateCopy.invalidDobError);
      return;
    }
    if (calculated < 21) {
      setErrorMsg(gateCopy.under21Error);
      return;
    }
    if (!acknowledged) {
      setErrorMsg(gateCopy.mustAcknowledgeError);
      return;
    }

    setErrorMsg('');
    setVerifiedAge(calculated);
    try {
      sessionStorage.setItem(
        ADULT_GATE_STORAGE_KEY,
        JSON.stringify({
          verifiedAt: new Date().toISOString(),
          age: calculated,
        } satisfies StoredAdultVerification)
      );
    } catch {
      // Ignore sessionStorage errors
    }
  };

  const handleReset = () => {
    setVerifiedAge(null);
    setDobInput('');
    setAcknowledged(false);
    setErrorMsg('');
    try {
      sessionStorage.removeItem(ADULT_GATE_STORAGE_KEY);
    } catch {
      // Ignore sessionStorage errors
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="adult-gate-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white dark:bg-[#13161C] border border-slate-200 dark:border-[#262C3A] shadow-xl p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#232732]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="adult-gate-modal-title"
                className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white"
              >
                {gateCopy.title}
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {gateCopy.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={gateCopy.close}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {service.complianceNotice && (
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-900/60 space-y-2.5">
              <h3 className="font-display text-sm font-semibold text-amber-900 dark:text-amber-300">
                {service.complianceNotice.title[lang]}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-950/90 dark:text-amber-200/90 leading-relaxed list-disc pl-4">
                {service.complianceNotice.items.map((item, idx) => (
                  <li key={idx}>{item[lang]}</li>
                ))}
              </ul>
            </div>
          )}

          {verifiedAge !== null ? (
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
              <div className="flex items-start gap-2.5 text-emerald-900 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm leading-relaxed">
                  <p className="font-semibold">
                    {gateCopy.verifiedBanner}
                  </p>
                  <p className="mt-1 font-mono text-xs tabular-nums opacity-85">
                    {service.primaryDomain} · {verifiedAge} {gateCopy.ageYearsLabel}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{gateCopy.resetVerification}</span>
                </button>

                <a
                  href={launchHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{gateCopy.openZoneButton}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="adult-gate-dob"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  {gateCopy.dobLabel}
                </label>
                <input
                  id="adult-gate-dob"
                  type="date"
                  required
                  value={dobInput}
                  onChange={(e) => setDobInput(e.target.value)}
                  className="mt-1.5 w-full px-3.5 py-2.5 text-sm rounded-lg bg-white dark:bg-[#0E1117] border border-slate-300 dark:border-[#2A303E] text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 tabular-nums"
                />
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {gateCopy.dobHelper}
                </p>
              </div>

              <label className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1117] border border-slate-200 dark:border-[#232732] cursor-pointer">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 shrink-0"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {gateCopy.acknowledgeLabel}
                </span>
              </label>

              {errorMsg && (
                <p
                  role="alert"
                  className="text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400"
                >
                  {errorMsg}
                </p>
              )}

              <div className="pt-2 border-t border-slate-200 dark:border-[#232732] flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#1E232F] dark:hover:bg-[#272D3C] rounded-lg transition-colors cursor-pointer"
                >
                  {gateCopy.close}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {gateCopy.verifyAndUnlock}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
