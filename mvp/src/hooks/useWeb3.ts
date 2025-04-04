import { useState, useEffect } from 'react'
import { web3Service, WalletState } from '@/services/web3'

export function useWeb3() {
  const [walletState, setWalletState] = useState<WalletState>(web3Service.getWalletState())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connect = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const newState = await web3Service.connectWallet()
      setWalletState(newState)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
    } finally {
      setIsLoading(false)
    }
  }

  const disconnect = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await web3Service.disconnectWallet()
      setWalletState(web3Service.getWalletState())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect wallet')
    } finally {
      setIsLoading(false)
    }
  }

  // Listen for account changes
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect()
      } else {
        setWalletState(web3Service.getWalletState())
      }
    }

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [])

  return {
    ...walletState,
    isLoading,
    error,
    connect,
    disconnect
  }
} 