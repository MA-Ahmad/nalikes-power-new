# EVM Wallet Setup Guide

This guide explains how to set up EVM wallet connectivity in the Powerblock frontend.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# WalletConnect Project ID - Get from https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
```

## Getting a WalletConnect Project ID

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up or log in to your account
3. Create a new project
4. Copy the Project ID and add it to your environment variables

## Features

The wallet integration includes:

- **Multi-chain Support**: Ethereum, Polygon, Arbitrum, Optimism, Base, and Sepolia (testnet)
- **Balance Display**: Shows ETH balance in the connected wallet
- **Network Detection**: Displays the current network name
- **Address Management**: Copy address to clipboard functionality
- **Account Management**: Open WalletConnect account modal
- **Secure Disconnection**: Proper wallet disconnection handling

## Components

### ConnectWalletButton

A complete wallet connection component that:

- Shows "Connect Wallet" button when disconnected
- Displays wallet info, balance, and controls when connected
- Includes a dropdown with wallet management options

### useWallet Hook

Provides all wallet-related functionality:

```typescript
const {
  isConnected,
  address,
  balance,
  formattedBalance,
  connectWallet,
  disconnectWallet,
  signMessage,
  // ... more utilities
} = useWallet()
```

## Integration

The wallet connect button is automatically shown in the navbar when users are authenticated. Users must sign in to the platform before they can connect their wallets.

## Supported Networks

- **Mainnet**: Ethereum, Polygon, Arbitrum, Optimism, Base
- **Testnet**: Sepolia (development only)

## Security

- Only authenticated users can connect wallets
- Secure message signing for wallet verification
- Proper error handling and user feedback
- No private key storage - uses WalletConnect protocol

## Dependencies

The following packages are required:

- `@reown/appkit`: AppKit for wallet connection UI
- `@reown/appkit-adapter-wagmi`: Wagmi adapter for EVM chains
- `wagmi`: React hooks for Ethereum
- `viem`: Low-level Ethereum client
