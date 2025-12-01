// home.js imports from auth.js

const AUTH_KEY = 'cc_auth';

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY)) || { isAuthenticated: false, user: null };
  } catch {
    return { isAuthenticated: false, user: null };
  }
}

export function setAuth(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated: true, user}))
}
export function clearAuth(user) {
  localStorage.removeItem(AUTH_KEY);
}

export function requireAuth(nextUrl) {
  const { isAthenticated } = getAuth();
  if (isAthenticated) {
    location.href = '/login.html?returnTo=${encodeURIComponent(nextUrl)}';
    return false;
  }
  location.href = nextUrl;
  return true;
}
