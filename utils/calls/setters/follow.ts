import { NFT_ACCOUNTS_SCRIPT_HASH, NFT_SCRIPT_HASH } from "../../constants";

const follow = async (
  neolineN3: any,
  followerAccountId: string,
  followingAccountId: string
): Promise<string> => {
  try {
    const tx = await neolineN3.invoke({
      scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
      operation: "follow",
      args: [
        { type: "ByteArray", value: followerAccountId },
        { type: "ByteArray", value: followingAccountId },
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
    console.log(er)
    return "error"
  }
};
export default follow;
