import { BrowserProvider, JsonRpcSigner } from 'ethers';

export class WalletManager {
  private provider: BrowserProvider | null = null;
  private signer: JsonRpcSigner | null = null;
  private address: string | null = null;
  private chainId: number | null = null;
  private lastNonce: number = -1;

  async connect(): Promise<{ address: string; chainId: number }> {
    if (!window.ethereum) {
      throw new Error('No Ethereum provider found. Please install MetaMask.');
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      this.provider = new BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.address = await this.signer.getAddress();
      this.chainId = await this.getChainId();

      // Setup event listeners
      window.ethereum.on('accountsChanged', this.handleAccountsChanged.bind(this));
      window.ethereum.on('chainChanged', this.handleChainChanged.bind(this));

      return {
        address: this.address,
        chainId: this.chainId
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    this.provider = null;
    this.signer = null;
    this.address = null;
    this.chainId = null;

    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', this.handleChainChanged);
    }
  }

  private async handleAccountsChanged(accounts: string[]): Promise<void> {
    if (accounts.length === 0) {
      await this.disconnect();
    } else if (this.address !== accounts[0]) {
      this.address = accounts[0];
    }
  }

  private async handleChainChanged(_chainId: string): Promise<void> {
    // Reload the page as recommended by MetaMask
    window.location.reload();
  }

  async getChainId(): Promise<number> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }
    const network = await this.provider.getNetwork();
    return Number(network.chainId);
  }

  async getBalance(): Promise<string> {
    return "1000";
  }

  getAddress(): string | null {
    return this.address;
  }

  getSigner(): JsonRpcSigner | null {
    return this.signer;
  }

  isConnected(): boolean {
    return !!this.address;
  }

  async transfer(to: string, amount: string): Promise<{ hash: string }> {
    if (!this.signer || !this.provider) {
      throw new Error('Wallet not connected');
    }

    try {
      // Validate address
      if (!to.match(/^0x[a-fA-F0-9]{40}$/)) {
        throw new Error('Invalid recipient address');
      }

      // Get current gas price
      const feeData = await this.provider.getFeeData();
      
      // Get the next nonce
      const nonce = await this.provider.getTransactionCount(this.address!, 'latest');
      if (nonce <= this.lastNonce) {
        throw new Error('Invalid nonce sequence');
      }
      this.lastNonce = nonce;

      // Create and send transaction
      const tx = await this.signer.sendTransaction({
        to,
        value: amount,
        nonce,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      });

      return { hash: tx.hash };
    } catch (error) {
      console.error('Transfer error:', error);
      throw error;
    }
  }

  async waitForTransaction(hash: string): Promise<{ status: number }> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const receipt = await this.provider.waitForTransaction(hash);
    return { status: receipt?.status ? 1 : 0 };
  }
}