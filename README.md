## CoffeeLoyalty: Stellar-Based Token and Loyalty Program

CoffeeLoyalty is a decentralized application built on the Stellar Testnet using a Soroban smart contract. It combines a web-based interface with a robust loyalty program for coffee shops, rewarding customers with 1 point per coffee purchase. After accumulating 10 points, customers earn a free coffee voucher. The system supports token management (mint, burn, transfer), account freezing, and admin controls, leveraging Stellar’s fast, low-cost transactions for a secure and transparent loyalty system.


## Project Overview

CoffeeLoyalty showcases a blockchain-based loyalty program written in Rust using the Soroban SDK. The project integrates a web interface for user interaction and a smart contract for managing tokens (CoffeeToken, symbol: COFFEE) and loyalty operations. It aims to modernize retail loyalty programs with transparency, security, and efficiency, fostering trust and customer engagement.

Vision: To transform loyalty programs using Stellar’s blockchain, creating a scalable, decentralized model for coffee shops and beyond, promoting financial inclusion and eliminating intermediaries.


## Features
- Token Management: Mint, burn, and transfer CoffeeTokens; view balances.
- Loyalty Program: Earn 1 point per coffee purchase; redeem 10 points for a free coffee.
- Wallet Management: Connect/disconnect wallets and view public keys.
- Admin Controls: Mint tokens, freeze/unfreeze accounts, set admins, and manage points (admin only).
- Allowance Mechanism: Approve third-party token spending.
- Transaction History: View recent transactions (transfers, mints).
- Account Freezing: Restrict token operations for specific accounts.
- Web Interface: User-friendly dashboard for balances, transfers, coffee points, and rewards.


## Project Structure

### Smart Contract Modules
- admin: Admin functions (e.g., set_admin, initialize).
- allowance: Manages token spending permissions (e.g., approve, transfer_from).
- balance: Handles token balances and transfers.
- coffee: Manages loyalty points and free coffee redemptions.
- contract: Core token and loyalty logic.
- metadata: Token details (name: CoffeeToken, symbol: COFFEE, decimals: 0).
- storage_types: Data structures for balances, points, and account statuses.

### Web Interface Components
- admin-panel: Mint tokens, freeze accounts, and manage admins.
- dashboard: Displays balances and enables transfers.
- coffee: Manages coffee points and rewards.
- transaction-history: Shows recent transactions.
- wallet-connect: Handles wallet connections.
- ui: Reusable UI components.
- lib/stores/wallet-store.ts: Zustand store for wallet state (connection status, public key).

## Installation and Setup

### Prerequisites

- Rust:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```
- Soroban CLI:
   ```bash
   cargo install --locked soroban-cli
   ```
- Node.js:
   ```bash
   sudo apt install nodejs npm
   ```
- Stellar SDK:
   ```bash
   npm install stellar-sdk
   ```

### Smart Contract Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd coffeeloyalty
   ```
2. Build the contract:
   ```bash
   cargo build --target wasm32-unknown-unknown --release
   ```
3. Configure Stellar Testnet:
   ```bash
   soroban config network add --global testnet \
     --rpc-url https://soroban-testnet.stellar.org:443 \
     --network-passphrase "Test SDF Network ; September 2015"
   ```
4. Deploy the contract:
   ```bash
   stellar contract deploy \
     --wasm target/wasm32-unknown-unknown/release/coffeeloyalty.wasm \
     --source coffeeadmin \
     --network testnet \
     --alias coffeetoken
   ```
5. Initialize the contract:
   ```bash
   stellar contract invoke \
     --id <CONTRACT_ID> \
     --source coffeeadmin \
     --network testnet \
     -- \
     initialize \
     --admin <ADMIN_ADDRESS> \
     --decimal 0 \
     --name "CoffeeToken" \
     --symbol "COFFEE"
   ```
   
### Web Interface Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Access the application:
   ```bash
   http://localhost:3000
   ```
4. Build for production (optional):
   ```bash
   npm run build
   npm start
   ```

## Usage

### Smart Contract

- Add Coffee Point:
   ```bash
   stellar contract invoke \
     --id <CONTRACT_ID> \
     --source coffeeadmin \
     --network testnet \
     -- \
     add_coffee_point \
     --account <USER_ADDRESS> \
     --shop_owner <SHOP_OWNER_PUBLIC_KEY>
   ```

- Check Free Coffee (after 10 points):
   ```bash
   stellar contract invoke \
     --id <CONTRACT_ID> \
     --source coffeeadmin \
     --network testnet \
     -- \
     check_free_coffee \
     --account <USER_ADDRESS>
   ```

- Redeem Free Coffee:
   ```bash
   stellar contract invoke \
     --id <CONTRACT_ID> \
     --source coffeeadmin \
     --network testnet \
     -- \
     redeem_free_coffee \
     --account <USER_ADDRESS>
   ```

- Freeze Account:
   ```bash
   stellar contract invoke \
     --id <CONTRACT_ID> \
     --source coffeeadmin \
     --network testnet \
     -- \
     freeze_account \
     --account <USER_ADDRESS>
   ```

- Mint Tokens (admin only):
   ```bash
   stellar contract invoke \
     --id <CONTRACT_ID> \
     --source coffeeadmin \
     --network testnet \
     -- \
     mint \
     --to <USER_ADDRESS> \
     --amount <AMOUNT>
   ```
   
## Web Interface
- Wallet Connection: Click "Connect Wallet" to link your Stellar wallet and view your public key.
- Dashboard: Check token balance and transfer CoffeeTokens to other addresses.
- Coffee Rewards: View coffee points, earn points per purchase, and redeem free coffees (10 points = 1 free coffee).
- Admin Panel: Mint tokens, freeze/unfreeze accounts, and assign admin roles (admin only).
- Transaction History: Review recent token transfers and minting activities.

## Technical Details
- Smart Contract: Written in Rust with Soroban SDK, using #![no_std] for efficiency. Persistent storage tracks balances, coffee points, free coffee vouchers, and frozen statuses with TTL extensions.
- Web Interface: Built with JavaScript, using Zustand for state management and Stellar SDK for blockchain interaction.
- Token: CoffeeToken (COFFEE) with 0 decimals.
- Testnet: Deployed on Stellar Testnet for testing and validation.

## Development
- Smart Contract: Test token operations, point accumulation, and redemptions on Stellar Testnet.
- Web Interface: Develop and test the interface using npm run dev. Build for production with npm run build.

## Testnet Details
- Contract ID: [Your Contract ID]
- Transaction Hash: [Example Transaction Hash]
- Testnet Explorer: Stellar Laboratory

License

This project is licensed under the MIT License.
