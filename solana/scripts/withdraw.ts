// scripts/withdraw_vault.ts
import * as anchor from '@coral-xyz/anchor';
import { Program, BN } from '@coral-xyz/anchor';
import {
    getOrCreateAssociatedTokenAccount,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { Vault } from '../target/types/vault';

// SAME CONSTANTS AS BEFORE
const VAULT_CONFIG = new anchor.web3.PublicKey('FeNCrijvnVfHq3LnDpnpR3SghXQdgMF5DEGFeLSburJ9');
const UNDERLYING_MINT = new anchor.web3.PublicKey('4oEACgQZ1EGx9ZvSgjDnSJNbdYuYxmDWYtZUfccXbCkB');
const VAULT_UNDERLYING = new anchor.web3.PublicKey('7LGYFWYRoVHbVfd8WCzWEiMh4sZKQAhDTbHsqTcKBYPt');
const SHARE_MINT = new anchor.web3.PublicKey('3kG8VaNydBHH6QUAS5sBANScGFUcfVuSYWw1G1dozc4Z');

(async () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const connection = provider.connection;
    const wallet = provider.wallet as anchor.Wallet;

    const program = anchor.workspace.Vault as Program<Vault>;

    console.log('RPC:', provider.connection.rpcEndpoint);
    console.log('User wallet:', wallet.publicKey.toBase58());

    // 1) Locate user underlying & share ATAs (must already exist from deposit)
    const userUnderlyingAta = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet.payer,
        UNDERLYING_MINT,
        wallet.publicKey
    );

    const userShareAta = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet.payer,
        SHARE_MINT,
        wallet.publicKey
    );

    console.log('User underlying ATA:', userUnderlyingAta.address.toBase58());
    console.log('User share ATA:', userShareAta.address.toBase58());

    const sharesBefore = await connection.getTokenAccountBalance(userShareAta.address);
    const vaultUnderlyingBefore = await connection.getTokenAccountBalance(VAULT_UNDERLYING);
    const userUnderlyingBefore = await connection.getTokenAccountBalance(userUnderlyingAta.address);

    console.log('\n=== Before withdraw ===');
    console.log('Vault underlying:', vaultUnderlyingBefore.value.uiAmountString);
    console.log('User underlying:', userUnderlyingBefore.value.uiAmountString);
    console.log('User shares   :', sharesBefore.value.uiAmountString);

    const sharesRaw = BigInt(sharesBefore.value.amount);
    if (sharesRaw === BigInt(0)) {
        console.log('\n⚠️  User has 0 shares – nothing to withdraw.');
        return;
    }

    // Option: withdraw all shares
    const sharesToWithdraw = sharesRaw;
    console.log(`\n→ Withdrawing ${sharesToWithdraw.toString()} raw shares...`);

    const txSig = await program.methods
        .withdraw(new BN(sharesToWithdraw.toString()))
        .accounts({
            vaultConfig: VAULT_CONFIG,
            vaultUnderlying: VAULT_UNDERLYING,
            shareMint: SHARE_MINT,
            user: wallet.publicKey,
            userUnderlyingAta: userUnderlyingAta.address,
            userShareAta: userShareAta.address,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        } as any)
        .rpc();

    console.log('✅ Withdraw tx:', txSig);

    const vaultUnderlyingAfter = await connection.getTokenAccountBalance(VAULT_UNDERLYING);
    const userUnderlyingAfter = await connection.getTokenAccountBalance(userUnderlyingAta.address);
    const userSharesAfter = await connection.getTokenAccountBalance(userShareAta.address);

    console.log('\n=== After withdraw ===');
    console.log('Vault underlying:', vaultUnderlyingAfter.value.uiAmountString);
    console.log('User underlying:', userUnderlyingAfter.value.uiAmountString);
    console.log('User shares   :', userSharesAfter.value.uiAmountString);
})();
