// Set previewMode = true to unlock the full experience for development/testing.
// Set to false to enforce the real countdown gate until May 31, 2026.
export const previewMode = false;

// Her name
export const herName = "Niha";

// Target birthday — May 31, 2026, 12:00 AM local time.
export function getBirthdayTarget(): Date {
  return new Date(2026, 4, 31, 0, 0, 0, 0);
}
