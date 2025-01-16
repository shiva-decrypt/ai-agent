import { Transaction, Contract } from '@/types';

export const dummyTransactions: Transaction[] = [
  {
    id: '0x1234...5678',
    type: 'send',
    amount: '0.5 ETH',
    network: 'Ethereum Mainnet',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    status: 'success',
    gasUsed: '21000',
    gasPrice: '30 Gwei',
    nonce: 42,
    blockNumber: 18934567,
    method: 'transfer',
    input: '0xa9059cbb000000000000000000000000742d35cc6634c0532925a3b844bc454e4438f44e0000000000000000000000000000000000000000000000000de0b6b3a7640000'
  },
  {
    id: '0x8765...4321',
    type: 'receive',
    amount: '1.2 ETH',
    network: 'Ethereum Mainnet',
    address: '0x123d35Cc6634C0532925a3b844Bc454e4438f123',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    status: 'success'
  },
  {
    id: '0xabcd...efgh',
    type: 'contract',
    amount: '0.1 ETH',
    network: 'Ethereum Mainnet',
    address: '0xDefi35Cc6634C0532925a3b844Bc454e4438fDef',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'pending'
  },
  {
    id: '0xijkl...mnop',
    type: 'send',
    amount: '0.8 ETH',
    network: 'Ethereum Mainnet',
    address: '0x987d35Cc6634C0532925a3b844Bc454e4438f987',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    status: 'failed'
  }
];

export const dummyContracts: Contract[] = [
  {
    id: '0x1111...2222',
    name: 'BlockToken',
    address: '0xToken35Cc6634C0532925a3b844Bc454e4438fTok',
    network: 'Ethereum Mainnet',
    type: 'token',
    deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'active',
    symbol: 'BLK',
    decimals: 18,
    totalSupply: '1,000,000,000 BLK',
    holders: 15234,
    compiler: 'v0.8.19+commit.7dd6d404',
    abi: JSON.stringify({
      "name": "transfer",
      "type": "function",
      "inputs": [
        {"name": "_to", "type": "address"},
        {"name": "_value", "type": "uint256"}
      ],
      "outputs": [{"type": "bool"}]
    })
  },
  {
    id: '0x3333...4444',
    name: 'CryptoApes',
    address: '0xNFT35Cc6634C0532925a3b844Bc454e4438fNFT',
    network: 'Ethereum Mainnet',
    type: 'nft',
    deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    status: 'active'
  },
  {
    id: '0x5555...6666',
    name: 'YieldFarm',
    address: '0xDeFi35Cc6634C0532925a3b844Bc454e4438fDeF',
    network: 'Ethereum Mainnet',
    type: 'defi',
    deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    status: 'inactive'
  }
];