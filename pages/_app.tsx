import Leftbar from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import path from "path";
import { useEffect } from "react";
declare global {
  interface Window {
    NEOLineN3: any; // Replace 'any' with the appropriate type
  }
}
export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  useEffect(() => {
    console.log(pathname);
  }, []);
  return pathname == "/" ? (
    <Component {...pageProps} />
  ) : (
    <Leftbar>
      <Component {...pageProps} />
    </Leftbar>
  );
}
