// Set previewMode = true to unlock the full experience for development/testing.
// Set to false to show the inline countdown until May 31st.
export const previewMode = true;

// Her name
export const herName = "Niha";

// Target birthday — local time. May 31st, current year (auto-rolls).
export function getBirthdayTarget(): Date {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 4, 31, 0, 0, 0, 0);
  if (target.getTime() < now.getTime() && !previewMode) {
    target = new Date(year + 1, 4, 31, 0, 0, 0, 0);
  }
  return target;
}
