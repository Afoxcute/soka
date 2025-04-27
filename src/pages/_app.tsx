'use client';

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "wagmi";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { embeddedWallet } from "@civic/auth-web3/wagmi";

import Layout from "../components/Layout";
import { chains, transports } from "../wagmi";

// Create a client for tanstack/react-query
const queryClient = new QueryClient();

// Get the Civic client ID from environment variables
const civicClientId = process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || "";

// Create wagmi config with Civic Auth embedded wallet
const wagmiConfig = createConfig({
  chains,
  transports,
  connectors: [
    embeddedWallet(),
  ],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
      <CivicAuthProvider clientId={civicClientId} initialChain={chains[0]}>
          <Toaster position='top-right' reverseOrder={false} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CivicAuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App;
