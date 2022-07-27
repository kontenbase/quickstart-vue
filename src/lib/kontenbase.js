import { KontenbaseClient } from '@kontenbase/sdk';

export const kontenbase = new KontenbaseClient({
  apiKey: import.meta.env.VITE_KONTENBASE_API_KEY,
});
