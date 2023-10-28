import { NFT_ACCOUNTS_SCRIPT_HASH, NFT_SCRIPT_HASH } from "../../constants";

const unfollow = async (
  neolineN3: any,
  unfollowerAccountId: string,
  unfollowingAccountId: string
): Promise<string> => {
  try {
    const tx = await neolineN3.invoke({
      scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
      operation: "unFollow",
      args: [
        { type: "ByteArray", value: unfollowerAccountId },
        { type: "ByteArray", value: unfollowingAccountId },
      ],
      fee: "0.0001",
      broadcastOverride: false,
      signers: [
        {
          account: "db598f072e85e59f7320388583e727cc73dd3a01",
          scopes: 16,
          allowedContracts: [NFT_ACCOUNTS_SCRIPT_HASH],
          allowedGroups: [],
        },
      ],
    });
    console.log("Tx Hash: " + tx.txid);
    return tx.txid;
  } catch (er) {
    return "error"
  }
};
export default unfollow;
