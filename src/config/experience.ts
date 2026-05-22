// Set previewMode = true to unlock the full experience for development/testing.
// Set to false to lock behind the birthday countdown until the configured date.
export const previewMode = true;

// Her name (used in the final reveal)
export const herName = "Aanya";

// Target birthday — local time. May 31st, current year (auto-rolls).
export function getBirthdayTarget(): Date {
  const now = new Date();
  const year = now.getFullYear();
  // Month is 0-indexed: 4 = May
  let target = new Date(year, 4, 31, 0, 0, 0, 0);
  if (target.getTime() < now.getTime() && !previewMode) {
    // If already past this year, target next year
    target = new Date(year + 1, 4, 31, 0, 0, 0, 0);
  }
  return target;
}
