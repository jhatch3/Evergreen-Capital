// scripts/deposit.ts
import * as anchor from '@coral-xyz/anchor';
import { Program, BN } from '@coral-xyz/anchor';
import {
    createAccount,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { Vault } from '../target/types/vault';

// ====== PASTE FROM init_vault OUTPUT ======
const VAULT_CONFIG = new anchor.web3.PublicKey('FeNCrijvnVfHq3LnDpnpR3SghXQdgMF5DEGFeLSburJ9');
const UNDERLYING_MINT = new anchor.web3.PublicKey('4oEACgQZ1EGx9ZvSgjDnSJNbdYuYxmDWYtZUfccXbCkB');
const VAULT_UNDERLYING = new anchor.web3.PublicKey('7LGYFWYRoVHbVfd8WCzWEiMh4sZKQAhDTbHsqTcKBYPt');
const SHARE_MINT = new anchor.web3.PublicKey('3kG8VaNydBHH6QUAS5sBANScGFUcfVuSYWw1G1dozc4Z');

const DEPOSIT_USDC = 500;
const DECIMALS = 6;
const DEPOSIT_RAW = BigInt(DEPOSIT_USDC) * BigInt(10 ** DECIMALS);

(async () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const connection = provider.connection;
    const wallet = provider.wallet as anchor.Wallet;

    const program = anchor.workspace.Vault as Program<Vault>;

    console.log('RPC:', connection.rpcEndpoint);
    console.log('User wallet:', wallet.publicKey.toBase58());

    // 1) Create a plain SPL token account for underlying
    const userUnderlyingAta = await createAccount(
        connection,
        wallet.payer, // payer
        UNDERLYING_MINT, // mint
        wallet.publicKey // owner
    );
    console.log('User underlying account:', userUnderlyingAta.toBase58());

    // Mint tokens to user so they have something to deposit
    await mintTo(
        connection,
        wallet.payer,
        UNDERLYING_MINT,
        userUnderlyingAta,
        wallet.payer,
        Number(DEPOSIT_RAW)
    );

    const beforeUnderlying = await connection.getTokenAccountBalance(userUnderlyingAta);
    console.log('User underlying BEFORE deposit:', beforeUnderlying.value.uiAmountString);

    // 2) Create a plain SPL token account for vault share mint
    const userShareAta = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet.payer,
        SHARE_MINT,
        wallet.publicKey
    );
    console.log('User share account:', userShareAta.address.toBase58());

    // 3) Call vault::deposit
    console.log(`\n→ Depositing ${DEPOSIT_USDC} into vault...`);

    const txSig = await program.methods
        .deposit(new BN(DEPOSIT_RAW.toString()))
        .accounts({
            vaultConfig: VAULT_CONFIG,
            vaultUnderlying: VAULT_UNDERLYING,
            shareMint: SHARE_MINT,
            user: wallet.publicKey,
            userUnderlyingAta, // already a PublicKey
            userShareAta: userShareAta.address, // <-- use .address
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        } as any)
        .rpc();

    console.log('✅ Deposit tx:', txSig);

    // 4) Balances after deposit
    const vaultUnderlyingAfter = await connection.getTokenAccountBalance(VAULT_UNDERLYING);
    const userUnderlyingAfter = await connection.getTokenAccountBalance(userUnderlyingAta);
    const userSharesAfter = await connection.getTokenAccountBalance(userShareAta.address);

    console.log('\n=== After deposit ===');
    console.log('Vault underlying:', vaultUnderlyingAfter.value.uiAmountString);
    console.log('User underlying:', userUnderlyingAfter.value.uiAmountString);
    console.log('User shares   :', userSharesAfter.value.uiAmountString);
})();
