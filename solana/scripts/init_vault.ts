import * as anchor from '@coral-xyz/anchor';
import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { Program } from '@coral-xyz/anchor';
import { Vault } from '../target/types/vault';

(async () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.Vault as Program<Vault>;
    const connection = provider.connection;
    const wallet = provider.wallet as anchor.Wallet;

    console.log('RPC endpoint:', provider.connection.rpcEndpoint);
    console.log('Wallet pubkey:', provider.wallet.publicKey.toBase58());

    // 1) Create USDC-like mint
    const mintAuthority = wallet.payer;
    const decimals = 6;
    const underlyingMint = await createMint(
        connection,
        mintAuthority,
        mintAuthority.publicKey,
        null,
        decimals
    );

    // 2) Derive vault_config PDA
    const [vaultConfigPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('vault_config'), underlyingMint.toBuffer()],
        program.programId
    );

    // 3) Prepare keypairs for vault_underlying account and share_mint
    const vaultUnderlying = anchor.web3.Keypair.generate();
    const shareMint = anchor.web3.Keypair.generate();

    // 4) Initialize vault on-chain
    await program.methods
        .initializeVault()
        .accounts({
            vaultConfig: vaultConfigPda,
            authority: wallet.publicKey,
            underlyingMint,
            vaultUnderlying: vaultUnderlying.publicKey,
            shareMint: shareMint.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        } as any)
        .signers([vaultUnderlying, shareMint])
        .rpc();

    console.log('✅ Vault initialized');
    console.log('vault_config:', vaultConfigPda.toBase58());
    console.log('underlying_mint:', underlyingMint.toBase58());
    console.log('vault_underlying:', vaultUnderlying.publicKey.toBase58());
    console.log('share_mint:', shareMint.publicKey.toBase58());
})();
