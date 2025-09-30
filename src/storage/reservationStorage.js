// LocalStorage-based fake reservation DB
// Provides a parallel client-side persistence when backend API is unavailable (e.g., static hosting)

const STORAGE_KEY = 'little_lemon_reservations';

export function getReservations() {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Failed to read reservations from localStorage', e);
    return [];
  }
}

export function addReservation(reservation) {
  if (typeof window === 'undefined') return;
  const current = getReservations();
  current.push({ ...reservation, createdAt: new Date().toISOString() });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to persist reservation', e);
  }
}

// date: Date object, time: display string (e.g., '7:30 PM')
export function findAvailableTables(date, time, people, tables) {
  const ymd = date.toISOString().slice(0,10);
  const reservations = getReservations();
  return tables.filter(t =>
    t.seats >= people &&
    !reservations.some(r => r.tableId === t.id && r.date === ymd && r.time === time)
  );
}

export function hasBackendModeForced() {
  // simple toggle: if window.__USE_BACKEND_RESERVATIONS__ is true, skip local storage mode
  if (typeof window === 'undefined') return false;
  return Boolean(window.__USE_BACKEND_RESERVATIONS__);
}

export function clearReservations() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
