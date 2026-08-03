import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://eliplmjrsslwnsefpnoi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_dBzqeMhvpWCWit7PYvS8QA_BacBrM1r";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export function createAccountClient() {
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
}

export async function currentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function requireUser() {
  const user = await currentUser();
  if (!user) {
    const next = encodeURIComponent(window.location.pathname);
    window.location.replace(`/login?next=${next}`);
    return null;
  }
  return user;
}
