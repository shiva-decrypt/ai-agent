export interface Message {
  id: number;
  type: 'user' | 'ai';
  content: any;
  timestamp: Date;
  status?: 'loading' | 'error' | 'success';
  systemType?: string;
  systemData?: Record<string, unknown>;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'contract';
  amount: string;
  address: string;
  network: string;
  gasUsed?: string;
  gasPrice?: string;
  nonce?: number;
  blockNumber?: number;
  timestamp: Date;
  status: 'success' | 'pending' | 'failed';
  method?: string;
  input?: string;
}

export interface Contract {
  id: string;
  name: string;
  address: string;
  network: string;
  type: 'token' | 'nft' | 'defi';
  abi?: string;
  bytecode?: string;
  compiler?: string;
  balance?: string;
  totalSupply?: string;
  decimals?: number;
  symbol?: string;
  deployedAt: Date;
  status: 'active' | 'inactive';
  transactions?: number;
  holders?: number;
}