import { useEffect, useState } from 'react';

export interface SsoSession {
  isAuthenticated: boolean;
  username: string;
  birthDate: string; // YYYY-MM-DD
}

const STORAGE_KEY = 'vz_sso_session';

const EMPTY_SESSION: SsoSession = {
  isAuthenticated: false,
  username: '',
  birthDate: '',
};

export function calculateAgeFromDob(birthDate: string): number | null {
  if (!birthDate) return null;
  const parts = birthDate.split('-').map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;

  const [year, month, day] = parts;
  const today = new Date();
  const dob = new Date(year, month - 1, day);
  if (Number.isNaN(dob.getTime()) || dob > today) return null;

  let age = today.getFullYear() - year;
  const monthDiff = today.getMonth() - (month - 1);
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
    age -= 1;
  }
  return age;
}

export function useSsoSession() {
  const [session, setSession] = useState<SsoSession>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SsoSession>;
        if (typeof parsed.isAuthenticated === 'boolean') {
          return {
            isAuthenticated: parsed.isAuthenticated,
            username: typeof parsed.username === 'string' ? parsed.username : '',
            birthDate: typeof parsed.birthDate === 'string' ? parsed.birthDate : '',
          };
        }
      }
    } catch {
      // Ignore storage errors
    }
    return EMPTY_SESSION;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Ignore storage errors
    }
  }, [session]);

  const age = session.isAuthenticated ? calculateAgeFromDob(session.birthDate) : null;
  const isVerifiedAdult21 = Boolean(session.isAuthenticated && age !== null && age >= 21);

  const signIn = (username: string, birthDate: string) => {
    setSession({
      isAuthenticated: true,
      username: username.trim() || 'member',
      birthDate,
    });
  };

  const signOut = () => {
    setSession(EMPTY_SESSION);
  };

  return {
    session,
    age,
    isVerifiedAdult21,
    signIn,
    signOut,
  };
}
