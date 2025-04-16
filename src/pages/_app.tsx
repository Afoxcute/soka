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
import { coreDao } from "wagmi/chains";

// Create a client for tanstack/react-query
const queryClient = new QueryClient();

// Create wagmi config with Civic Auth embedded wallet
const wagmiConfig = createConfig({
  chains: [coreDao],
  transports,
  connectors: [
    embeddedWallet(),
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <CivicAuthProvider clientId="YOUR_CIVIC_CLIENT_ID">
          <Toaster position='top-right' reverseOrder={false} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CivicAuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
