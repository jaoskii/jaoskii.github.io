/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Shared key for the contact endpoint (X-Jao-Key). Set at build from the JAO_CONTACT_KEY repository variable. */
  readonly VITE_JAO_CONTACT_KEY?: string;
}
