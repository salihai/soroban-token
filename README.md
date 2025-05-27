# Soroban Token Interface

The **Soroban Token Interface** is a web-based application that interacts with a token contract on the Stellar blockchain. It provides features like wallet connection, token management, transaction history, and a coffee loyalty program.

---

## Features

- **Wallet Management**: Connect and disconnect wallets.
- **Dashboard**: View token balances and perform transfers.
- **Admin Panel**: Mint tokens, freeze/unfreeze accounts, and manage admins.
- **Transaction History**: View recent transactions.
- **Coffee Rewards**: Manage coffee points and redeem free coffees.

---

## Project Structure

### Components

- **`admin-panel`**: Admin functionalities like minting tokens and freezing accounts.
- **`dashboard`**: Displays token balances and allows transfers.
- **`transaction-history`**: Shows transaction history.
- **`wallet-connect`**: Handles wallet connection.
- **`coffee`**: Manages coffee points and rewards.

### Zustand Store

- **`wallet-store`**: Manages wallet state, including connection status and public key.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd soroban-token-interface
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```bash
   http://localhost:3000
   ```

---

## Usage

### Wallet Connection

- Use the Connect Wallet button to connect your wallet.
- Once connected, your wallet's public key will be displayed.

### Dashboard
- View your token balance.
- Transfer tokens by specifying the recipient's address and amount.

### Admin Panel
- Mint Tokens: Create new tokens and assign them to an account.
- Freeze/Unfreeze Accounts: Manage account statuses.
- Add Admins: Grant admin privileges to other accounts.

### Transaction History
- View a list of recent transactions, including transfers and mints.

### Coffee Rewards
- Add Coffee Points: Earn points for coffee purchases.
- Check Free Coffee: Redeem 10 points for a free coffee.
- Redeem Free Coffee: Use available free coffee rewards.

---

## Development

- Start Development Server:
   ```bash
   npm run dev
   ```

- Build for Production:
   ```bash
   npm run build
   ``` 

- Start Production Server:
   ```bash
   npm start
   ```

---

## File Structure
    
    soroban-token-interface/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── admin-panel.tsx
    │   ├── coffee.tsx
    │   ├── dashboard.tsx
    │   ├── transaction-history.tsx
    │   ├── wallet-connect.tsx
    │   └── ui/
    ├── lib/
    │   └── stores/
    │       └── wallet-store.ts
    ├── public/
    ├── styles/
    └── ...
    

---

## License

This project is licensed under the MIT License.
