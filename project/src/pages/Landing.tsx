import { ArrowRight, Shield, Wallet, Zap, ChartBar, Code, Blocks, Users, Globe, Lock, Cpu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <img src={logo} className="w-12 h-12 " />
            <span className="text-xl font-bold">BlockchainAI</span>
          </div>
          <Link to="/app">
            <Button variant="outline">Launch App</Button>
          </Link>
        </nav>

        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Your AI-Powered
            <br />
            Blockchain Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience the future of blockchain interaction with our intelligent assistant.
            Manage transactions, monitor wallets, and interact with smart contracts effortlessly.
          </p>
          <Link to="/app">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center bg-white/80 backdrop-blur border-none shadow-lg">
            <ChartBar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h4 className="text-2xl font-bold mb-1">$1B+</h4>
            <p className="text-sm text-gray-600">Total Volume</p>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur border-none shadow-lg">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h4 className="text-2xl font-bold mb-1">50K+</h4>
            <p className="text-sm text-gray-600">Active Users</p>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur border-none shadow-lg">
            <Blocks className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <h4 className="text-2xl font-bold mb-1">1M+</h4>
            <p className="text-sm text-gray-600">Transactions</p>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur border-none shadow-lg">
            <Globe className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="text-2xl font-bold mb-1">150+</h4>
            <p className="text-sm text-gray-600">Countries</p>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-24 bg-white/50 backdrop-blur">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Wallet Management</h3>
            <p className="text-gray-600">
              Securely manage your crypto wallets with advanced features and real-time monitoring.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Assistance</h3>
            <p className="text-gray-600">
              Get intelligent insights and recommendations for your blockchain operations.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Enhanced Security</h3>
            <p className="text-gray-600">
              Advanced security features to protect your assets and transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Powered by Advanced Technology</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <Card className="p-6 bg-white/80 backdrop-blur border-none shadow-lg">
            <Cpu className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Integration</h3>
            <p className="text-sm text-gray-600">
              Advanced machine learning models for intelligent blockchain operations
            </p>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur border-none shadow-lg">
            <Lock className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Infrastructure</h3>
            <p className="text-sm text-gray-600">
              Enterprise-grade security with multi-layer protection
            </p>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur border-none shadow-lg">
            <Code className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Contracts</h3>
            <p className="text-sm text-gray-600">
              Automated and secure contract deployment and management
            </p>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur border-none shadow-lg">
            <Sparkles className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">DeFi Integration</h3>
            <p className="text-sm text-gray-600">
              Seamless integration with major DeFi protocols
            </p>
          </Card>
        </div>
      </div>

      {/* Supported Networks */}
      <div className="container mx-auto px-6 py-24 bg-white/50 backdrop-blur">
        <h2 className="text-3xl font-bold text-center mb-12">Supported Networks</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Card className="p-6 bg-white/80 backdrop-blur border-none shadow-lg">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <img src="https://ethereum.org/static/4f10d2777b2d14759feb01c65b2765f7/69ce7/eth-glyph-colored.png" alt="Ethereum" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Ethereum</h3>
            <p className="text-sm text-gray-600 text-center">Mainnet & Testnets</p>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur border-none shadow-lg">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <img src="https://cryptologos.cc/logos/polygon-matic-logo.png" alt="Polygon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Polygon</h3>
            <p className="text-sm text-gray-600 text-center">PoS & zkEVM</p>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur border-none shadow-lg">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <img src="https://arbitrum.io/wp-content/uploads/2023/06/cropped-Arbitrum_Logo-1.png" alt="Arbitrum" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Arbitrum</h3>
            <p className="text-sm text-gray-600 text-center">One & Nova</p>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur border-none shadow-lg">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <img src="https://optimism.io/images/logos/optimism.svg" alt="Optimism" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Optimism</h3>
            <p className="text-sm text-gray-600 text-center">Mainnet & Testnet</p>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">More networks coming soon!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Card className="px-4 py-2 bg-white/60 backdrop-blur border-none">
              <span className="text-sm text-gray-600">Base</span>
            </Card>
            <Card className="px-4 py-2 bg-white/60 backdrop-blur border-none">
              <span className="text-sm text-gray-600">zkSync</span>
            </Card>
            <Card className="px-4 py-2 bg-white/60 backdrop-blur border-none">
              <span className="text-sm text-gray-600">Avalanche</span>
            </Card>
            <Card className="px-4 py-2 bg-white/60 backdrop-blur border-none">
              <span className="text-sm text-gray-600">BNB Chain</span>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-6 py-24 bg-white/50 backdrop-blur">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-6">1</div>
            <h3 className="text-xl font-semibold mb-4">Connect Your Wallet</h3>
            <p className="text-gray-600">
              Securely connect your preferred crypto wallet to get started
            </p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-6">2</div>
            <h3 className="text-xl font-semibold mb-4">Chat with AI</h3>
            <p className="text-gray-600">
              Interact with our AI assistant to manage your blockchain operations
            </p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mb-6">3</div>
            <h3 className="text-xl font-semibold mb-4">Execute Operations</h3>
            <p className="text-gray-600">
              Perform transactions and manage your assets with confidence
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Join thousands of users who are already experiencing the future of blockchain interaction.
        </p>
        <Link to="/app">
          <Button size="lg" className="gap-2">
            Launch Application <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
              <span className="font-semibold">BlockchainAI</span>
            </div>
            <p className="text-sm text-gray-600">
              The future of blockchain interaction powered by artificial intelligence.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Smart Wallet</li>
              <li>AI Assistant</li>
              <li>Security</li>
              <li>Analytics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Support</li>
              <li>Community</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">
              © 2024 BlockchainAI. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <span className="text-sm text-gray-600">Privacy Policy</span>
            <span className="text-sm text-gray-600">Terms of Service</span>
            <span className="text-sm text-gray-600">Cookie Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}