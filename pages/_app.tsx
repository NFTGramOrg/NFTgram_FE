import "@/styles/globals.css";
import type { AppProps } from "next/app";
declare global {
  interface Window {
    NEOLineN3: any; // Replace 'any' with the appropriate type
  }
}
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
