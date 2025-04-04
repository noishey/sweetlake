import { ethers } from 'ethers'

export interface WalletState {
  address: string | null
  isConnected: boolean
  provider: ethers.providers.Web3Provider | null
  signer: ethers.Signer | null
}

class Web3Service {
  private static instance: Web3Service
  private state: WalletState = {
    address: null,
    isConnected: false,
    provider: null,
    signer: null
  }

  private constructor() {}

  static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service()
    }
    return Web3Service.instance
  }

  async connectWallet(): Promise<WalletState> {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask')
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()

      this.state = {
        address,
        isConnected: true,
        provider,
        signer
      }

      return this.state
    } catch (error) {
      console.error('Error connecting wallet:', error)
      throw error
    }
  }

  async disconnectWallet(): Promise<void> {
    this.state = {
      address: null,
      isConnected: false,
      provider: null,
      signer: null
    }
  }

  getWalletState(): WalletState {
    return { ...this.state }
  }
}

export const web3Service = Web3Service.getInstance() 