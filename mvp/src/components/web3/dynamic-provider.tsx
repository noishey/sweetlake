'use client';

import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { createConfig, WagmiProvider } from 'wagmi';
import { http } from 'viem';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  AlgorandWalletConnectors,
} from '@dynamic-labs/algorand';
import {
  BitcoinWalletConnectors,
} from '@dynamic-labs/bitcoin';
import {
  CosmosWalletConnectors,
} from '@dynamic-labs/cosmos';
import {
  EthereumWalletConnectors,
} from '@dynamic-labs/ethereum';
import {
  FlowWalletConnectors,
} from '@dynamic-labs/flow';
import {
  SolanaWalletConnectors,
} from '@dynamic-labs/solana';
import {
  StarknetWalletConnectors,
} from '@dynamic-labs/starknet';
import {
  SuiWalletConnectors,
} from '@dynamic-labs/sui';

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'b8decae1-6ce7-4a06-94bc-d02df7881ce7',
        walletConnectors: [
          EthereumWalletConnectors,
        ],
        appName: 'sweetlake',
        appLogoUrl: '/logo.svg',
        emailVerification: {
          enabled: true,
          mode: 'required',
        },
        appSettings: {
          signIn: {
            title: 'Welcome to Sweetlake',
            subtitle: 'Connect your wallet to get started',
            buttonText: 'Loop In',
          },
          signUp: {
            title: 'Create Your Account',
            subtitle: '',
            buttonText: 'Loop In',
          },
        },
        debug: true,
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            {children}
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
